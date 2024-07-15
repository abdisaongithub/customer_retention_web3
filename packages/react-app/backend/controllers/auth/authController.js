const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const { getSafeUser } = require("../../helpers/hide_user_credentials");
const {
  sendConfirmationEmail,
  sendResetEmail,
} = require("../../helpers/email_tools");
const User = db.user;
const Role = db.role;

const jwt_secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Role,
        as: "roles",
      },
    });

    if (user) {
      if (user.status === false)
        return res
          .status(400)
          .json({
            message:
              "Account not active. Verify email first, or contact call center",
          });

      const isMatch = await bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };

        let new_user = getSafeUser(user);

        await jwt.sign(
          payload,
          jwt_secret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            return res.json({ user: new_user, token: token });
          }
        );
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email: email } });

    if (!(user === null)) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);

    const pass = await bcrypt.hash(password, salt);

    user = await User.create({ email: email, name: name, password: pass });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwt_secret, { expiresIn: 360000 }, async (err, token) => {
      if (err) throw err;

      user.confirmation_token = token;

      user
        .save()
        .then(async (data) => {
          await sendConfirmationEmail({
            email: email,
            token: data.confirmation_token,
          });

          return res
            .status(201)
            .send({
              message: `Email sent to ${email}. Check email and confirm`,
            });
        })
        .catch((e) => {
          return res.status(400).send({ message: `Not Registered` });
        });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error");
  }
};

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const random_token = Math.random(100000).toFixed(4) * 1000000;
    user.reset_number = random_token;
    await user.save();
    const result = await sendResetEmail({ email: email, token: random_token });

    return res.json({
      message: `Email sent to ${email} with instructions to reset your account`,
    });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

exports.confirmPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const { token, email, password } = req.body;

    const user = await User.findOne({
      where: { email: email, reset_number: token },
    });

    if (!user)
      return res
        .status(404)
        .json({
          message: "Either Invalid token was provided or User does not exist",
        });

    user.reset_number = null;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.json({
      message: `Password has been resetted. Login to continue to Yetale`,
    });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ where: { confirmation_token: token } });
    if (!user) res.send({ message: "Token invalid or User is not registered" });
    user.status = true;
    await user.save();
    return res.json({ message: "Email verified" });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, new_password, authUser } = req.body;
  try {
    let user = await User.findByPk(authUser.id, {
      include: {
        model: Role,
        as: "roles",
      },
    });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const payload = {
        user: {
          id: user.id,
        },
      };

      user.password = await bcrypt.hash(new_password, 10);
      await user.save();

      let new_user = getSafeUser(user);

      jwt.sign(payload, jwt_secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ user: new_user, token: token });
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(1, {
      attributes: {
        exclude: ["password", "confirmation_token", "createdAt", "updatedAt"],
      },
      include: {
        model: Role,
        as: "roles",
      },
    });
    // console.log(await bcrypt.hash('12345678', 10))
    return res.json({ data: user });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { email, phone, name } = req.body;
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "confirmation_token", "createdAt", "updatedAt"],
      },
    });
    user.email = email;
    user.phone = phone;
    user.name = name;

    await user.save();
    return res.json({ data: user });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};

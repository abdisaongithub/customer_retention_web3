import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SignUp = (props) => {
  return (
    <>
      <div className="flex sm:flex-col md:flex-col h-full w-full py-2 px-2">
        <div className="flex-grow">
          <div className="flex-col">
            <div className="flex">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              {/* <p className="ml-2 ">Nexus</p> */}

              <div className="ml-auto mr-0 flex">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex-grow "></div> */}
      </div>
    </>
  );
};

export default SignUp;

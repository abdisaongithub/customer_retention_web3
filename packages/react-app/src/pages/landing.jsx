import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Pill from "./pill";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import CardanoLogo from "../assets/cardano-ada-logo.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CoinsCarousel from "./carousel";
import CoinsCarouselItem from "./carousel_item";

import BottomSheetComponent from "./bottom_sheet";
import { Link } from "react-router-dom";

import SearchIcon from "../assets/icons/search.svg";
import NotificationsIcon from "../assets/icons/lightning.svg";
import Scan from "../assets/icons/scan.svg";
import CardItem from "./card_item";

const Landing = (props) => {
  return (
    <>
      <div className="flex sm:flex-col md:flex-col h-full w-full py-2 px-2">
        <div className="flex-grow">
          <div className="flex-col">
            <div className="flex mx-2">
              <Link to={"/profile"}>
                <Avatar className={`h-8 w-8`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <div className="ml-auto mr-0 flex h-7">
                <img src={SearchIcon} className={`ml-1`} />

                <img src={NotificationsIcon} className={`ml-1`} />

                <img src={Scan} className={`ml-1`} />
              </div>
            </div>

            <CardItem />

            <CardItem />

            <CardItem />

            {/* <Link to={"/auth/signin"}>Sign In</Link>
            <br />
            <Link to={"/auth/signup"}>Sign Up</Link>
            <br />
            <Link to={"/profile"}>Profile</Link> */}
          </div>
        </div>

        {/* <div className="flex-grow "></div> */}
      </div>
    </>
  );
};

export default Landing;

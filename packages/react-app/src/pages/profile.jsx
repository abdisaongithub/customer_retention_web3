import SettingsIcon from "../assets/icons/setting.svg";
import UserIcon from "../assets/icons/user.svg";
import React from "react";

import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import CardanoLogo from "../assets/cardano-ada-logo.svg";
import Pill from "./pill";
import CardItem from "./card_item";

const Profile = (props) => {
  return (
    <div className={"p-2"}>
      <div className="flex">
        <div></div>
        <div className={` ml-auto `}>
          <img src={SettingsIcon} className={" h-10"} alt="" />
        </div>
      </div>

      <div className="flex">
        {/* <div></div> */}
        <div className={` mx-auto `}>
          <img src={UserIcon} className={" h-20 rounded-full "} alt="" />
        </div>
      </div>

      <p className="text-xl font-extrabold text-center mt-2">John Doe</p>

      <div className=""> </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4 border border-black mx-0 my-2 ">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="claimable">Claimable</TabsTrigger>
          <TabsTrigger value="claimed">Claimed</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="p-2">
            <CardTitle>Pending</CardTitle>
            <CardDescription>These are all the pending Tasks</CardDescription>
          </div>

          <CardItem />
        </TabsContent>
        <TabsContent value="claimable">
          <div className="p-2">
            <CardTitle>Claimable</CardTitle>
            <CardDescription>These are all the Claimable Tasks</CardDescription>
          </div>
          <CardItem />
        </TabsContent>
        <TabsContent value="claimed">
          <div className="p-2">
            <CardTitle>Claimed</CardTitle>
            <CardDescription>These are all the Claimed Tasks</CardDescription>
          </div>
          <CardItem />
        </TabsContent>
        <TabsContent value="missed">
          <div className="p-2">
            <CardTitle>Missed</CardTitle>
            <CardDescription>These are all the Missed Tasks</CardDescription>
          </div>
          <CardItem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

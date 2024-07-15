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

const Landing = (props) => {

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

              <div className="ml-auto mr-0 flex">
                <Avatar className={`ml-1`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar className={`ml-1`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar className={`ml-1`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <Link to={`/detail/1`} className="">
              <div className="mt-2 mx-2">
                <Card className="w-full sm:w-26">
                  <CardHeader className={`p-2 m-0 `}>
                    <CardTitle className={`flex h-8 pt-0 my-auto`}>
                      <img
                        src={CardanoLogo}
                        className={`object-cover w-8 h-8 p-1 border border-slate-200 rounded-full`}
                        alt=""
                      />

                      <p className={`my-auto ml-2 text-sm font-semibold`}>
                        Cardano Network
                      </p>
                    </CardTitle>
                    {/* <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent className={`p-2 m-0`}>
                    <CardTitle className={`flex h-4 m-0 p-0`}>
                      <p className={`my-auto ml-0 text-xl font-bold`}>
                        Ada Coin Launch
                      </p>
                    </CardTitle>

                    <div className="flex w-full items-center mt-2">
                      <div className="flex flex-grow mt-auto">
                        <Pill />

                        <Pill />
                      </div>
                      <div className="w-auto">
                        <img
                          src={`https://github.com/shadcn.png`}
                          className={`rounded-xl w-16 object-contain`}
                          alt=""
                        />
                      </div>
                    </div>

                    {/* <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Framework</Label>
                          <Select>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="next">Next.js</SelectItem>
                              <SelectItem value="sveltekit">
                                SvelteKit
                              </SelectItem>
                              <SelectItem value="astro">Astro</SelectItem>
                              <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form> */}
                  </CardContent>
                  {/* <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter> */}
                </Card>
                
                {/* <BottomSheetComponent /> */}

              </div>
            </Link>
          </div>
        </div>

        {/* <div className="flex-grow "></div> */}
      </div>
    </>
  );
};

export default Landing;

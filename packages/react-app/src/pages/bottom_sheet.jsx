import React, { useRef, useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import CardanoLogo from "../assets/cardano-ada-logo.svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet } from "react-modal-sheet";

const BottomSheetComponent = (props) => {
  const [isOpen, setOpen] = useState(true);
  const ref = useRef();
  const snapTo = (i) => ref.current?.snapTo(i);
  const scrollAreaRef = useRef();

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header className="p-4">
            <div className="flex h-8 pt-0 my-auto justify-center">
              <img
                src={CardanoLogo}
                className={`object-cover w-8 h-8 p-1 border border-slate-200 rounded-full`}
                alt=""
              />
              <p className={`my-auto ml-2 text-md font-bold`}>
                Cardano Network
              </p>
            </div>
            <p className="text-center">
              Airdrops for Ada Coin Launch - Airdrops for Ada Coin Launch
            </p>
          </Sheet.Header>
          <Sheet.Content className="px-4 ">
            <div className="flex mt-2">
              <div className="h-[40px] flex text-wrap rounded-full text-center align-center justify-center border-2 border-[#CBFF04] overflow-hidden shadow-lg px-4 py-1 mr-2 ">
                <p className="my-auto text-xs">Ongoing</p>
              </div>
              <div className="h-[40px] flex text-wrap rounded-full text-center align-center justify-center border-2 border-[#CBFF04] overflow-hidden shadow-lg px-4 py-1 mr-2 ">
                <p className="my-auto text-xs">
                  2024/05/20 16:00 ~ 2024/05/26 16:00
                </p>
              </div>
            </div>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <div className="rounded-full bg-gray-300 text-black px-4 py-2 mt-10 text-sm">
              Optional: Complete the below entries to increase the chance of
              winning.
            </div>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>
            <a href="#">
              <div className="flex  rounded-xl bg-black mt-4 text-white">
                <Avatar className={`border-white border-2 ml-2 p-0 my-2`}>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="ml-3 my-auto text-xl font-bold">
                  <p>Follow Ada on X</p>
                </div>
              </div>
            </a>

            <div className="flex-col rounded-xl border-[#CDFF02] border-2 mt-4 text-black px-2 py-4">
              <span className="font-extrabold">Lucky Draw In :</span>
              <div className="flex w-full text-center">
                <div className="flex-col justify-center mx-auto">
                  <p className="text-3xl font-bold mx-auto">2</p>
                  <p className="text-sm">Days</p>
                </div>
                <div className="flex-col justify-center mx-auto">
                  <p className="text-3xl font-bold ">0</p>
                  <p className="text-sm">Hours</p>
                </div>

                <div className="flex-col justify-center mx-auto">
                  <p className="text-3xl font-bold">27</p>
                  <p className="text-sm">Minutes</p>
                </div>
                <div className="flex-col justify-center mx-auto">
                  <p className="text-3xl font-bold">14</p>
                  <p className="text-sm">Seconds</p>
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    
    </>
  );
};

export default BottomSheetComponent;

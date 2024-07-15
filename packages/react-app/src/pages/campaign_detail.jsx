import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CardanoLogo from "../assets/cardano-ada-logo.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import NexusLogo from "../assets/nexus_logo.png";
import { Button } from "@/components/ui/button";

const CampaignDetail = (props) => {
  return (
    <div className="px-4 mb-4">
      <div className="mb-2">
        <div className="flex h-8 pt-0 my-auto justify-center">
          <img
            src={CardanoLogo}
            className={`object-cover w-8 h-8 p-1 border border-slate-200 rounded-full`}
            alt=""
          />
          <p className={`my-auto ml-2 text-lg font-bold`}>Cardano Network</p>
        </div>
        <p className="text-center">
          Airdrops for Ada Coin Launch - Airdrops for Ada Coin Launch
        </p>
      </div>
      <div className="flex mt-2">
        <div className="h-[40px] flex text-wrap rounded-full text-center align-center justify-center border-2 border-[#CBFF04] overflow-hidden shadow-lg px-4 py-1 mr-2 ">
          <p className="my-auto text-xs">Ongoing</p>
        </div>
        <div className="h-[40px] flex text-wrap rounded-full text-center align-center justify-center border-2 border-[#CBFF04] overflow-hidden shadow-lg px-4 py-1 mr-2 ">
          <p className="my-auto text-xs">2024/05/20 16:00 ~ 2024/05/26 16:00</p>
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
        Optional: Complete the below entries to increase the chance of winning.
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

      <div className="my-2">
        <Accordion type="single" collapsible defaultValue={"item-1"}>
          <AccordionItem value="item-1">
            <AccordionTrigger className={``}>Description</AccordionTrigger>
            <AccordionContent>
              <p>The L1 Powering Apps Through DePin </p>
              <p className="underline">$KAI and you</p>

              <p>Let's make supercomputing accessible and affordable </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="my-2">
        <Accordion type="single" collapsible defaultValue={"item-1"}>
          <AccordionItem value="item-1">
            <AccordionTrigger className={``}>Questers</AccordionTrigger>
            <AccordionContent>
              <p>The L1 Powering Apps Through DePin </p>
              <p className="underline">$KAI and you</p>

              <p>Let's make supercomputing accessible and affordable </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="rounded rounded-t-full">
        <div className="flex">
          <p className="font-bold">Reward </p>
          <div className="rounded-full flex px-2 py-1">
            <img src={NexusLogo} className="h-8" />
            <p>Lucky Draw</p>
          </div>
          <div className="rounded-full flex px-2 py-1 ml-auto">
            <img src={NexusLogo} className="h-8" />
            <p>Polygon</p>
          </div>
        </div>
        <Button variant="outline" className={`mx-auto w-full`}>
          Claim Reward
        </Button>
      </div>
    </div>
  );
};

export default CampaignDetail;

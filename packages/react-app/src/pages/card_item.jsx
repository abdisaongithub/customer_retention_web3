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

const CardItem = (props) => {
  return (
    <>
      <Link to={`/detail/1`} className="">
        <div className="mt-3 mx-2">
          <Card className="w-full sm:w-26 border-[1px] border-black shadow-lg">
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
                    className={`rounded-xl w-16 h-16 object-contain`}
                    alt=""
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Link>
    </>
  );
};

export default CardItem;

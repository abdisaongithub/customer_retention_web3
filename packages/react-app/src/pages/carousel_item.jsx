import React from "react";

const CoinsCarouselItem = (props) => {
  return (
    <>
      <div className="rounded-full bg-green-400 overflow-hidden shadow-lg mx-1 px-4 py-1">
        <img
          src={props.image}
          className={`rounded-full overflow-hidden w-[20px] h-[20px] justify-start mb-2`}
          alt=""
        />
        <p className="font-semibold text-wrap w-auto">{props.amount} oi</p>
      </div>
    </>
  );
};

export default CoinsCarouselItem;

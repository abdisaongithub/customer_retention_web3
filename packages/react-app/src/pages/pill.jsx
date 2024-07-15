const Pill = (props) => {
  return (
    <div className="flex flex-wrap rounded-full text-center justify-center bg-[#CBFF04] overflow-hidden shadow-lg mr-2 pl-1 pr-4 py-1">
      <img
        src={"https://github.com/shadcn.png"}
        className={`rounded-full overflow-clip w-[24px] h-[24px] justify-start mb-0`}
        alt=""
      />
      <p className="flex ml-2 font-semibold text-wrap w-auto align-middle self-center text-center my-auto">
        {200} <span className="ml-1">{'USDT'}</span>
      </p>
    </div>
  );
};

export default Pill;

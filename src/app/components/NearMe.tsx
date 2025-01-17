import Image from "next/image";
const NearMe: React.FC = () => {


    return (
        <div className=" w-[100%] pt-[40px] pl-[16px] bg-[#F3F6FF]  ">
            <h1>შენთან ახლოს</h1>
            <div className="flex flex-col gap-[22px] pt-[22px] pb-[54px]">

            
            <div className="flex justify-between items-center px-4 w-[92%] ">
                <Image
                src='/images/parking icon.png'
                alt="a parking icon"
                width={35}
                height={35}
                />
            <div className="flex flex-col gap-[11px] w-[65%]">
            <h1 className="text-[#192342] font-medium">უნივერსიტეტის ქუჩა</h1>
            <p className="text-xs"> უნივერსიტეტის ქუჩა 12, მეორე შესასვლელი</p> </div>
            <span>4 კმ</span>
            </div>
            <div className="flex justify-between items-center px-4 w-[92%] ">
                <Image
                src='/images/parking icon.png'
                alt="a parking icon"
                width={35}
                height={35}
                />
            <div className="flex flex-col gap-[11px] w-[65%]">
            <h1 className="text-[#192342] font-medium">უნივერსიტეტის ქუჩა</h1>
            <p className="text-xs"> უნივერსიტეტის ქუჩა 12, მეორე შესასვლელი</p> </div>
            <span>4 კმ</span>
            </div>
            <div className="flex justify-between items-center px-4 w-[92%] ">
                <Image
                src='/images/parking icon.png'
                alt="a parking icon"
                width={35}
                height={35}
                />
            <div className="flex flex-col gap-[11px] w-[65%]">
            <h1 className="text-[#192342] font-medium">უნივერსიტეტის ქუჩა</h1>
            <p className="text-xs"> უნივერსიტეტის ქუჩა 12, მეორე შესასვლელი</p> </div>
            <span>4 კმ</span>
            </div>
            <div className="flex justify-between items-center px-4 w-[92%] ">
                <Image
                src='/images/parking icon.png'
                alt="a parking icon"
                width={35}
                height={35}
                />
            <div className="flex flex-col gap-[11px] w-[65%]">
            <h1 className="text-[#192342] font-medium">უნივერსიტეტის ქუჩა</h1>
            <p className="text-xs"> უნივერსიტეტის ქუჩა 12, მეორე შესასვლელი</p> </div>
            <span>4 კმ</span>
            </div>

            </div>

            <div className="flex justify-center items-center w-[100%] pb-[14px] cursor-pointer">

          <div className="w-[92px] h-[7px] bg-[#D9D9D9] rounded-[56px]"></div>
          </div>
        </div>
    );
};

export default NearMe;

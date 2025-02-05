import { Button } from "./Button";
import WelcomeMessage from "./WelcomeMessage";

export const WelcomeSection: React.FC = () => {
    return (
        <div className="flex items-center flex-col gap-12 mb-[10%] w-[91%] m-auto">
            <WelcomeMessage />
            <Button
                onClick={() => {
                    console.log("გაგრძელება იქნება....");
                }}
                label="გაგრძელება"
                className="w-[91%] m-auto bg-[#15593A] text-[16px] text-white leading-7 font-[350] rounded-[14px] flex justify-center items-center h-[55px] "
            />
        </div>
    );
};

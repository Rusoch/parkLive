import Link from "next/link";
import WelcomeMessage from "./WelcomeMessage";
import { useTranslation } from "react-i18next";

export const WelcomeSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center flex-col gap-12 mb-[10%] w-[91%] m-auto">
      <WelcomeMessage />
      <Link
        scroll={false}
        href="/map"
        className="cursor-pointer rounded-[14px] flex items-center justify-center w-[91%] m-auto bg-[#15593A] text-[16px] text-white leading-7 font-[350] h-[55px]"
      >
        {t("continue")}
      </Link>
    </div>
  );
};

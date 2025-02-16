import Link from "next/link";
import WelcomeMessage from "./WelcomeMessage";
import { useTranslation } from "react-i18next";

export const WelcomeSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-start flex-col gap-10 mb-[14dvh] w-[91%] m-auto">
      <WelcomeMessage />
      <Link
        scroll={false}
        href="/map"
        className="cursor-pointer rounded-[6px] flex items-center justify-center w-full m-auto bg-green-light text-[16px] leading-7 text-white font-bold h-[55px]"
      >
        {t("continue")}
      </Link>
    </div>
  );
};

import { useAddToHomescreenPrompt } from "../hooks/useBeforeInstallPrompt";
import Logo from "./Logo";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const InstallPopup: React.FC = () => {
  const [isVisible, setVisibleState] = useState(true);
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const { t } = useTranslation();

  const handleDismiss = () => {
    setVisibleState(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {prompt && (
        <div
          onClick={handleDismiss}
          className="w-screen h-screen absolute top-0 bottom-0 flex justify-center items-start z-50"
        >
          <div className="flex justify-center items-center gap-[5%] w-[70%] h-[73px] rounded-[12px] bg-bg-gray absolute top-[4%] left-[14.5%]  py-[6.4%] px-[3.5%] border-box">
            <Logo className="w-[34px] h-[34px] text-[9px]" />
            <div className="flex-1">
              <p className="font-bold text-[10px] text-black">{`${t("install")} "${t("ourApp")}"`}</p>
              <p className="w-[16.48%] h-[16.4%] font-light text-[10px] text-text-muted">
                https://wepark.live/
              </p>
            </div>
            <button className="font-bold text-[12px] text-blue-light" onClick={promptToInstall}>
              Install
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPopup;

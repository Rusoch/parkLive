import React, { useState } from "react";
import { DynamicMenu } from "./DynamicMenu";
import { FeedbackPopup } from "./FeedbackPopup";
import { FAQPopup } from "./FAQPopup";
import { TermsPopup } from "./TermsPopup";
import { QuestionIcon } from "../icons/QuestionIcon";
import { RateIcon } from "../icons/RateIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { useTranslation } from "react-i18next";

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type PopupType = "feedback" | "faq" | "terms" | null;

export const MoreMenu: React.FC<MoreMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const closePopup = () => setActivePopup(null);

  const menuItems = [
    {
      id: "faq",
      icon: <QuestionIcon className="w-5 h-5 text-green-dark dark:text-dark-text-secondary" />,
      label: t("faq"),
      action: () => setActivePopup("faq"),
    },
    {
      id: "terms",
      icon: <DocumentIcon className="w-5 h-5 text-green-dark dark:text-dark-text-secondary" />,
      label: t("termsAndConditions"),
      action: () => setActivePopup("terms"),
    },
    {
      id: "feedback",
      icon: <RateIcon className="w-5 h-5 text-green-dark dark:text-dark-text-secondary" />,
      label: t("rateUs"),
      action: () => setActivePopup("feedback"),
    },
  ];

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={onClose} />
          <DynamicMenu items={menuItems} onClose={onClose} />
        </>
      )}
      <div className="mb-[8.5dvh]">
        <FeedbackPopup isOpen={activePopup === "feedback"} onClose={closePopup} />
        <FAQPopup isOpen={activePopup === "faq"} onClose={closePopup} />
        <TermsPopup isOpen={activePopup === "terms"} onClose={closePopup} />
      </div>
    </>
  );
};

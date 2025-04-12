import React, { useState } from "react";
import { DynamicMenu } from "./DynamicMenu";
import { FeedbackPopup } from "./FeedbackPopup";
import { FAQPopup } from "./FAQPopup";
import { TermsPopup } from "./TermsPopup";
import { QuestionIcon } from "../icons/QuestionIcon";
import { RateIcon } from "../icons/RateIcon";
import { DocumentIcon } from "../icons/DocumentIcon";

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type PopupType = "feedback" | "faq" | "terms" | null;

export const MoreMenu: React.FC<MoreMenuProps> = ({ isOpen, onClose }) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const closePopup = () => setActivePopup(null);

  const menuItems = [
    {
      id: "feedback",
      icon: <RateIcon className="w-5 h-5" />,
      label: "შეფასება",
      action: () => setActivePopup("feedback"),
    },
    {
      id: "faq",
      icon: <QuestionIcon className="w-5 h-5" />,
      label: "ხშირად დასმული კითხვები",
      action: () => setActivePopup("faq"),
    },
    {
      id: "terms",
      icon: <DocumentIcon className="w-5 h-5" />,
      label: "წესები და პირობები",
      action: () => setActivePopup("terms"),
    },
  ];

  return (
    <>
      {isOpen && <DynamicMenu items={menuItems} onClose={onClose} />}
      <div className="mb-[8.5dvh]">
        <FeedbackPopup isOpen={activePopup === "feedback"} onClose={closePopup} />
        <FAQPopup isOpen={activePopup === "faq"} onClose={closePopup} />
        <TermsPopup isOpen={activePopup === "terms"} onClose={closePopup} />
      </div>
    </>
  );
};

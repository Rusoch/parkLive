import React, { useState } from "react";
import { PopupContainer } from "./PopupContainer";
import { StarIcon } from "../icons/StarIcon";
import { useTranslation } from "react-i18next";

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <PopupContainer onClose={onClose}>
      <div className="h-full flex flex-col">
        <h2 className="text-[24px] font-semibold text-center mb-4 text-green-dark dark:text-dark-text-secondary">
          {t("rateUs")}
        </h2>
        <p className="text-gray-600 dark:text-dark-text-secondary text-center mb-6">
          {t("feedbackQuestion")}
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} isSelected={star <= rating} onClick={() => setRating(star)} />
          ))}
        </div>

        <textarea
          placeholder={t("leaveComment")}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-dark-primary text-gray-900 dark:text-dark-text-secondary"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-green-light text-white rounded-md font-bold"
          >
            {t("rateNow")}
          </button>
          <button
            onClick={handleLater}
            className="w-full py-2 text-gray-600 dark:text-dark-text-secondary text-[12px] font-medium"
          >
            {t("later")}
          </button>
        </div>
      </div>
    </PopupContainer>
  );
};

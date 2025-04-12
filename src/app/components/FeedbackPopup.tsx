import React, { useState } from "react";
import { PopupContainer } from "./PopupContainer";
import { StarIcon } from "../icons/StarIcon";

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
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
        <h2 className="text-[24px] font-semibold text-center mb-4 text-green-dark">შეგვაფასე</h2>
        <p className="text-gray-600 text-center mb-6">
          მოგწონთ ჩვენი აპლიკაცია? თქვენი გამოხმაურება დაგვეხმარება მის გაუმჯობესებაში
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} isSelected={star <= rating} onClick={() => setRating(star)} />
          ))}
        </div>

        <textarea
          placeholder="დატოვე კომენტარი..."
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none flex-grow"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-green-light text-white rounded-md font-bold"
          >
            შეფასება
          </button>
          <button
            onClick={handleLater}
            className="w-full py-2 text-gray-600 text-[12px] font-medium"
          >
            მოგვიანებით
          </button>
        </div>
      </div>
    </PopupContainer>
  );
};

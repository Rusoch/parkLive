import React, { useState } from "react";
import { PopupContainer } from "./PopupContainer";

type FeedbackPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
        <h2 className="text-xl font-semibold text-center mb-4">შეგვაფასე</h2>
        <p className="text-gray-600 text-center mb-6">გთხოვთ შეაფასოთ ჩვენი სერვისი</p>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
              <svg
                className={`w-8 h-8 ${star <= rating ? "text-[#FFA726]" : "text-[#BFC7D4]"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        <textarea
          placeholder="დატოვე კომენტარი"
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none flex-grow"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#1F5E3D] text-white rounded-md font-bold"
          >
            შეფასება
          </button>
          <button onClick={handleLater} className="w-full py-2 text-gray-600 font-medium">
            მოგვიანებით
          </button>
        </div>
      </div>
    </PopupContainer>
  );
};

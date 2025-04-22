import React, { useState } from "react";
import { PopupContainer } from "./PopupContainer";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FAQPopup: React.FC<FAQPopupProps> = ({ isOpen, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  // Sample FAQ data - in a real app, this would come from props or an API
  const faqItems: FAQItem[] = [
    {
      question: "როგორ შემიძლია პარკირების ადგილის დაჯავშნა?",
      answer:
        "პარკირების ადგილის დასაჯავშნად, აირჩიეთ სასურველი ადგილი რუკაზე და დააჭირეთ 'დაჯავშნა' ღილაკს. შემდეგ აირჩიეთ სასურველი დრო და გადაიხადეთ.",
    },
    {
      question: "რა ხარჯები იქნება პარკირებისთვის?",
      answer:
        "პარკირების ხარჯები დამოკიდებულია ადგილის მდებარეობასა და დროზე. ყველა ფასი მითითებულია აპლიკაციაში პარკირების ადგილის არჩევისას.",
    },
    {
      question: "როგორ შემიძლია ჩემი ჯავშნის გაუქმება?",
      answer:
        "ჯავშნის გასაუქმებლად, გადადით 'ჩემი ჯავშნები' განყოფილებაში, აირჩიეთ სასურველი ჯავშანი და დააჭირეთ 'გაუქმება' ღილაკს.",
    },
    {
      question: "რა ხდება თუ გვიან მივალ პარკირების ადგილზე?",
      answer:
        "თუ გვიან მიხვალთ პარკირების ადგილზე, თქვენი ჯავშანი შენარჩუნებული იქნება 15 წუთის განმავლობაში. ამის შემდეგ, თუ არ მიხვალთ, ჯავშანი ავტომატურად გაუქმდება.",
    },
    {
      question: "როგორ შემიძლია გადავხადო პარკირების საფასური?",
      answer:
        "პარკირების საფასურის გადასახადად შეგიძლიათ გამოიყენოთ საკრედიტო/დებეტური ბარათი, ბანკის გადარიცხვა ან ელექტრონული საფულე.",
    },
    {
      question: "რა უნდა გავაკეთო თუ პარკირების ადგილი დაკავებულია?",
      answer:
        "თუ პარკირების ადგილი დაკავებულია, გთხოვთ დაუკავშირდეთ მხარდაჭერის სამსახურს. ჩვენ დაგეხმარებით ალტერნატიული ადგილის მოძიებაში ან თქვენი ჯავშნის გაუქმებაში.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <PopupContainer onClose={onClose}>
      <div className="h-full overflow-y-auto pr-2">
        <div className="space-y-[19px]">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-[#D9D9D9] rounded-[10px] overflow-hidden">
              <button
                className="flex justify-between items-center w-full text-left p-4 dark:dark-bg-transparen"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-dark-text-secondary transform transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedIndex === index && (
                <div className="px-4 pb-4 text-[14px] text-[#606060] dark:text-dark-text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PopupContainer>
  );
};

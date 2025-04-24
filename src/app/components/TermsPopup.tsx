import React, { useState } from "react";
import { PopupContainer } from "./PopupContainer";

type TermsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubSection = {
  id: string;
  content: string;
};

type Section = {
  title: string;
  subSections?: SubSection[];
  content?: string[];
};

const sections: Section[] = [
  {
    title: "1. ზოგადი პირობები",
    subSections: [
      {
        id: "1.1",
        content:
          "პლატფორმა უზრუნველყოფს სერვისს, რომელიც მომხმარებლებს (მძღოლებს) საშუალებას აძლევს მარტივად იპოვონ და საჭიროების შემთხვევაში დაჯავშნონ ავტომობილის სადგომის ადგილი.",
      },
      {
        id: "1.2",
        content:
          "პლატფორმის გამოყენებით, თქვენ ადასტურებთ, რომ თქვენ მიერ მოწოდებული ინფორმაცია სწორია.",
      },
      {
        id: "1.3",
        content: "ჩვენ ვიტოვებთ უფლებას, ნებისმიერ დროს შევცვალოთ ეს წესები.",
      },
    ],
  },
  {
    title: "2. რეგისტრაცია და მომხმარებლის ვალდებულებები",
    content: [
      "პარკირების ადგილის დაჯავშნისას, თქვენ ვალდებული ხართ გადაიხადოთ მითითებული თანხა.",
      "გადახდა შესაძლებელია ბარათით ან სხვა მითითებული გადახდის მეთოდებით.",
    ],
  },
];

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const TermsPopup: React.FC<TermsPopupProps> = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PopupContainer onClose={onClose}>
      <div className="h-full overflow-y-auto pr-2">
        <h2 className="text-[16px] font-medium text-[#606060] dark:text-dark-text-secondary mb-4">
          ბოლო განახლება: {currentDate}
        </h2>

        <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary mb-6">
          ეს დოკუმენტი აღწერს ჩვენი სერვისის გამოყენების პირობებს და წესებს. გთხოვთ, ყურადღებით
          წაიკითხოთ.
        </p>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary">
                  {section.title}
                </h3>
                <ChevronIcon isOpen={openSection === index} />
              </button>
              {openSection === index && (
                <div className="pb-4 space-y-2">
                  {section.subSections
                    ? section.subSections.map((subsection, subIndex) => (
                        <div key={subIndex} className="mb-3">
                          <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
                            <span className="font-medium">{subsection.id}. </span>
                            {subsection.content}
                          </p>
                        </div>
                      ))
                    : section.content?.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-[14px] text-[#606060] dark:text-dark-text-secondary"
                        >
                          {paragraph}
                        </p>
                      ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PopupContainer>
  );
};

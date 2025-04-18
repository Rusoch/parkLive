import React from "react";
import { PopupContainer } from "./PopupContainer";

type TermsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TermsPopup: React.FC<TermsPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Get current date in Georgian format
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

        <div className="space-y-6">
          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">
              1. სერვისის გამოყენება
            </h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              ჩვენი სერვისი საშუალებას გაძლევთ მარტივად იპოვოთ და დააჯავშნოთ პარკირების ადგილები.
              სერვისის გამოყენებით, თქვენ თანხმობთ ამ პირობების დაცვას.
            </p>
          </section>

          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">
              2. გადახდები და ჯავშნები
            </h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              პარკირების ადგილის დაჯავშნისას, თქვენ ვალდებული ხართ გადაიხადოთ მითითებული თანხა.
              გადახდა შესაძლებელია ბარათით ან სხვა მითითებული გადახდის მეთოდებით.
            </p>
          </section>

          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">
              3. პირადი მონაცემების დაცვა
            </h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              ჩვენ ვიღებთ ზომებს თქვენი პირადი მონაცემების დასაცავად. ჩვენი კონფიდენციალურობის
              პოლიტიკა აღწერს, თუ როგორ ვიყენებთ და ვიცავთ თქვენს მონაცემებს.
            </p>
          </section>

          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">
              4. პასუხისმგებლობის შეზღუდვა
            </h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              ჩვენ არ ვიღებთ პასუხისმგებლობას პარკირების ადგილების ხელმისაწვდომობაზე ან
              მდგომარეობაზე. ჩვენი სერვისი მხოლოდ ინფორმაციის გაცვლის პლატფორმაა.
            </p>
          </section>

          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">
              5. სერვისის ცვლილებები
            </h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              ჩვენ ვიტოვებთ უფლებას შევცვალოთ ან შევწყვიტოთ სერვისი ნებისმიერ დროს, წინასწარი
              შეტყობინების გარეშე. ჩვენ არ ვიღებთ პასუხისმგებლობას სერვისის ცვლილებებზე ან
              შეწყვეტაზე.
            </p>
          </section>

          <section>
            <h3 className="text-[16px] font-semibold text-[#333333] dark:text-dark-text-secondary mb-2">6. კონტაქტი</h3>
            <p className="text-[14px] text-[#606060] dark:text-dark-text-secondary">
              თუ გაქვთ კითხვები ან პრობლემები ჩვენს სერვისთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ
              მხარდაჭერის სამსახურს support@wepark.live ან დაგვირეკეთ +995 32 2 123456.
            </p>
          </section>
        </div>
      </div>
    </PopupContainer>
  );
};

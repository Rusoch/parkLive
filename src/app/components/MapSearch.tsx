import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { useTranslation } from "react-i18next";

type TProps = {
  handleQueryString: (queryString: string) => void;
  handleFocus: () => void;
  handleCloseModal: () => void;
  isSearchActive: boolean;
};

export const MapSearch: React.FC<TProps> = ({
  handleQueryString,
  handleFocus,
  handleCloseModal,
  isSearchActive,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleArrowClick = () => {
    setSearchQuery("");
    handleCloseModal();
  };
  const handleSearchBarFocus = () => {
    handleFocus();
  };
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchQuery(inputText);
  };

  // Debounced search
  useEffect(() => {
    const timerId = setTimeout(() => {
      // validate user input to be valid query string
      const regex = /^(?=.{4,})(?=(?:.*[A-Za-z\u10D0-\u10FF]){3,}).*$/;
      if (typeof searchQuery === "string" && regex.test(searchQuery)) {
        // send query string to map for searching places
        handleQueryString(searchQuery);
      }
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, handleQueryString]);

  return (
    <>
      <div className="w-[90dvw] fixed flex align-center justify-between gap-[19px] top-[8dvh] left-[5dvw] z-40">
        {isSearchActive && (
          <ArrowLeftIcon
            className="text-text-primary dark:text-white cursor-pointer"
            onClick={handleArrowClick}
          />
        )}
        <div className="flex-1 relative bg-transparent">
          <SearchIcon className="text-text-dark dark:text-dark-text text-[16.5px] absolute left-[15px] top-[50%] transform -translate-y-[50%] " />
          <input
            type="text"
            value={searchQuery}
            onChange={inputHandler}
            placeholder={t("search")}
            onFocus={handleSearchBarFocus}
            className="shadow-[0_2px_15.8px_0_rgba(0,0,0,0.25),0_7px_15.8px_0_rgba(0,0,0,0.15)] text-text-dark dark:text-dark-text text-[16px] w-[100%] font-[350] bg-bg-input dark:bg-bg-input-dark focus:outline-none focus:border-none h-[43px] rounded-[14px] pl-[45px]"
          />
        </div>
      </div>
    </>
  );
};

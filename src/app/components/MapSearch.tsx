import { useEffect, useRef, useState } from "react";
import RecentlySearched from "./RecentlySearched";
import { ArrowLeftIcon } from "../icons/Arrow-leftIcon";
import { SearchIcon } from "../icons/SearchIcon";

export const MapSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isRecentlySearched, setIsRecentlySearched] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const searchInputRef = useRef(null);

  const handleArrowClick = () => {
    setSearchQuery("");
    setShowArrow(false);
    setIsRecentlySearched(false);
  };
  const handleSearchBarFocus = () => {
    setIsRecentlySearched(true);
    setShowArrow(true);
  };
  const handleSearch = (debouncedQueryString: string) => {
    console.log(debouncedQueryString);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);
  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <div className="w-[90dvw] fixed flex align-center justify-between gap-[19px] top-[8%] left-[5dvw] z-40">
      {showArrow && (
        <ArrowLeftIcon className="text-[#192342] cursor-pointer" onClick={handleArrowClick} />
      )}
      <div className="flex-1 relative bg-transparent">
        <SearchIcon className="text-[#2E18149E] text-[16.5px]  absolute left-[15px] top-[50%] transform -translate-y-[50%] " />
        <input
          type="text"
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="მოძებნე ..."
          onFocus={handleSearchBarFocus}
          className="shadow-[0_2px_15.8px_0_rgba(0,0,0,0.25),0_7px_15.8px_0_rgba(0,0,0,0.15)] text-[#2E18149E] text-[16px] w-[100%] font-[350] bg-[#E8ECF3] focus:outline-none focus:border-none h-[43px] rounded-[14px] pl-[45px]"
        />
      </div>
      {isRecentlySearched && <RecentlySearched searchQuery={debouncedSearchQuery} />}
    </div>
  );
};

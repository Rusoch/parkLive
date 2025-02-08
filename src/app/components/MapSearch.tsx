import { useEffect, useRef, useState } from "react";
import RecentlySearched from "./RecentlySearched";
import { ArrowLeftIcon } from "../icons/Arrow-leftIcon";
import { SearchIcon } from "../icons/SearchIcon";

export const MapSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isRecentlySearched, setIsRecentlySearched] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");
  const [divShadow, setDivShadow] = useState("none");

  const searchInputRef = useRef(null);

  const handleArrowClick = () => {
    setSearchQuery("");
    setShowArrow(false);
    setIsRecentlySearched(false);
    setBgColor("transparent");
    setDivShadow("none");
  };
  const handleSearchBarFocus = () => {
    setBgColor("rgba(243, 246, 255, 1)");
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
    <div
      style={{
        backgroundColor: bgColor,
        boxShadow: divShadow || "0 7px 15.8px 0 rgba(0, 0, 0, 0.25)",
        transition: " box-shadow 0.3s ease",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
      className="w-[100vw] absolute flex flex-col align-center pt-[8vh] z-40 pl-[40px] pr-[40px] shadow-md"
    >
      <div className={`w-[100%] flex justify-center items-center`}>
        {showArrow && (
          <ArrowLeftIcon className="text-[#192342] cursor-pointer " onClick={handleArrowClick} />
        )}
        <div className="w-[96%] relative">
          <SearchIcon className="text-[#2E18149E] text-[16.5px]  absolute left-[15px] top-[50%] transform -translate-y-[50%] " />
          <input
            type="text"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="მოძებნე"
            onFocus={handleSearchBarFocus}
            className="shadow-[0_7px_15.8px_0_rgba(0,0,0,0.25)]text-[#2E18149E] text-[16px] w-[100%] font-[350] bg-[#E8ECF3] focus:outline-none focus:border-none h-[43px] rounded-[14px] pl-[45px]"
          />
        </div>
      </div>
      {isRecentlySearched && <RecentlySearched searchQuery={debouncedSearchQuery} />}
    </div>
  );
};

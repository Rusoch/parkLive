import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const RecentlySearched: React.FC<{
    searchQuery: string;
    hasError: boolean;
}> = ({ searchQuery, hasError }) => {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const debouncedSaveSearch = useCallback(
        debounce((search: string) => {
            setRecentSearches((prev) => {
                const newRecentSearches = [...new Set([search, ...prev])].slice(0, 4);

                localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
                return newRecentSearches;
            });
        }, 3000),
        [setRecentSearches],
    );

    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem("recentSearches") ?? "[]");
        setRecentSearches(savedSearches);
    }, []);

    useEffect(() => {
        if (searchQuery && !hasError) {
            debouncedSaveSearch(searchQuery);
        }
    }, [searchQuery, hasError, debouncedSaveSearch]);
    return (
        <div className="w-[100%] pt-[40px] pl-[16px] bg-[#F3F6FF]">
            <h1>ბოლოს მოძებნილები</h1>
            <div className="flex flex-col gap-[22px] pt-[22px] pb-[54px]">
                {recentSearches.slice(0, 4).map((search, index) => (
                    <div key={index} className="flex justify-between items-center px-4 w-[92%]">
                        <Image
                            src="/images/parking icon.png"
                            alt="a parking icon"
                            width={35}
                            height={35}
                        />
                        <span className="flex justify-center items-center w-[100%]">{search}</span>
                        <span>კმ</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center w-[100%] pb-[14px] cursor-pointer">
                <div className="w-[92px] h-[7px] bg-[#D9D9D9] rounded-[56px]"></div>
            </div>
        </div>
    );
};

export default RecentlySearched;

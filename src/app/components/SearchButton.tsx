'use client'
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import NearMe from "./NearMe";
interface SearchButtonProps {
    onSearch: (data: any) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState("");
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showArrow, setShowArrow] = useState(false);
    const [changeDiv, setChangeDiv] = useState("justify-center");
    const [showDiv, setShowDiv] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleInputClick = () => {
        setShowArrow(true);
        setChangeDiv("justify-between");
        setShowDiv(true);
    };
    const handleArrowClick = () => {
        setSearchInput("");
        setShowArrow(false);
        setShowDiv(false);
    };

    const performSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            if (searchInput.trim() !== "") {
                const response = await fetch(
                    `http://37.232.17.163:5000/api/places?query=${encodeURIComponent(searchInput)}`,
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }

                const data = await response.json();
                onSearch(data);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError("Error during search: " + error.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            performSearch();
        }, 500);

        setDebounceTimer(timer);

        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="w-[100vw] absolute flex flex-col align-center pt-[8vh] z-40 pl-[40px] pr-[40px]">
            <div className={`w-[100%] flex ${changeDiv} items-center`}>
                {showArrow && (
                    <FaArrowLeft
                        className="text-[#192342] w-[24px] h-[24px] cursor-pointer"
                        onClick={handleArrowClick}
                    />
                )}
                <div className=" w-[96%] relative">
                    <FaSearch className="text-[#2E18149E] text-[16.5px] absolute left-[15px] transform -translate-y-1/2 top-1/2" />
                    <input
                        type="text"
                        placeholder="მოძებნე ..."
                        className="text-[#2E18149E] text-[16px] w-[100%] font-[350] bg-[#E8ECF3] focus:outline-none focus:border-none h-[43px] pl-[45px] rounded-[14px]"
                        value={searchInput}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                    />
                </div>
            </div>
            {showDiv && <NearMe />}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SearchButton;

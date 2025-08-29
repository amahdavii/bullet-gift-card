import { FC } from "react";
import ClearSVG from "../icons/ClearSVG";
import SearchSVG from "../icons/SearchSVG";
import IconButton from "../ui/IconButton";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const DashboardSearch: FC<Props> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex items-center w-full rounded-[0.5rem] border border-[#E3E1E2] focus-within:border-black focus-within:border-2 text-sm outline-0 relative">
      <IconButton>
        <SearchSVG />
      </IconButton>
      <input
        type="text"
        placeholder="Search for brands"
        className="w-full py-[0.625rem] px-[0.5rem] border border-transparent focus:outline-none placeholder:text-[#716E70]"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button
          onClick={() => setSearchValue("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <ClearSVG />
        </button>
      )}
    </div>
  );
};

export default DashboardSearch;

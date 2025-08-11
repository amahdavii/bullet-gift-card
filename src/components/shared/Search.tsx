"use client";

import { FC, useState } from "react";
import SearchSVG from "@/components/icons/SearchSVG";
import IconButton from "../ui/IconButton";
import NarrowLeft from "../icons/NarrowLeftSVG";
import ClearSVG from "../icons/ClearSVG";
import { useSearchProducts } from "@/services/categoriesList";
import Image from "next/image";
import { useProduct } from "@/context/productContext";
import { useModalQuery } from "@/hooks/useModalQuery";

const SearchModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useSearchProducts(searchValue);
  const { setSelectedProduct } = useProduct();

  const { open: openSelectedCard } = useModalQuery({
    modalValue: "selected-card",
  });

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl mx-auto min-h-screen w-full px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center space-x-2 py-[0.875rem]">
          <IconButton onClick={onClose}>
            <NarrowLeft />
          </IconButton>
          <h1 className="text-[1rem] font-semibold">Search</h1>
          <div className="w-[38px] h-[32px]">&nbsp;</div>
        </header>
        <div className="flex items-center w-full rounded-[0.5rem] border border-[#E3E1E2] focus-within:border-black focus-within:border-2 text-sm outline-0 relative">
          <IconButton>
            <SearchSVG />
          </IconButton>
          <input
            type="text"
            placeholder="Search for brands"
            className="w-full py-[0.75rem] px-[0.5rem] border border-transparent focus:outline-none placeholder:text-[#716E70]"
            autoFocus
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

        {!isLoading && data?.products.length ? (
          <ul className="space-y-[1.65625rem] mt-[2.6875rem]">
            {data.products.map((item) => (
              <li key={`${item.id} ${item.cardId}`}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(item);
                    onClose();
                    openSelectedCard();
                  }}
                >
                  <Image
                    src={item.imagePath}
                    width={74}
                    height={47}
                    alt={item.imageName}
                  />
                  <p className="font-semibold ml-[1rem] text-[1rem]">
                    {item.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {!isLoading && !data?.products.length ? (
          <div className="flex flex-col items-center justify-center py-[2.625rem]">
            <Image
              src="/assets/images/not-found.png"
              width={293}
              height={197}
              alt="not found image"
            />
            <div className="flex flex-col justify-center items-center w-[19.6875rem] space-y-[0.5rem] mt-[2.625rem]">
              <h2 className="font-bold">Nothing Found</h2>
              <p className="text-center">
                You might want to try using different keywords or check for any
                types
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Search: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center w-full rounded-[0.5rem] border border-[#E3E1E2] text-sm outline-0 mt-[1rem]">
        <IconButton>
          <SearchSVG />
        </IconButton>
        <input
          type="text"
          placeholder="Search for brands"
          className="w-full py-[0.75rem] px-[0.5rem] outline-0 placeholder:text-[#716E70]"
          onFocus={() => setModalOpen(true)}
          readOnly
        />
      </div>

      {modalOpen && <SearchModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Search;

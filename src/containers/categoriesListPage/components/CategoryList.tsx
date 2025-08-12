"use client";
import { useGetAllCategoriesList } from "@/services/categoriesList";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, FC } from "react";

const CategoryList: FC = () => {
  const { data } = useGetAllCategoriesList();
  const { push } = useRouter();

  const searchParams = useSearchParams();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft -= e.deltaY;
      }
    };

    slider.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      slider.removeEventListener("wheel", onWheel);
    };
  }, []);

  const changeHandler = (id: number, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("title", name);

    push(`/category/${id}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="pl-4 md:px-4">
      <div
        ref={sliderRef}
        className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide pr-4 md:pr-0 whitespace-nowrap cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {data?.map((item) => (
          <button
            key={item.id}
            className="flex-shrink-0 text-[#0C0A0C] rounded-[0.5rem] bg-[#F1F0F0] px-4 py-2 text-[0.875rem] font-medium hover:bg-[#e5e5e5] cursor-pointer select-none"
            onClick={() => changeHandler(item.id, item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

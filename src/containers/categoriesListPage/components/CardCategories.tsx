"use client";
import ArrowRightSVG from "@/components/icons/ArrowRightSVG";
import { useProduct } from "@/context/productContext";
import { useModalQuery } from "@/hooks/useModalQuery";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  items: ProductItem[];
  id: number;
}

const CardCategories: FC<Props> = ({ title, items, id }) => {
  const { push } = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { setSelectedProduct } = useProduct();

  const searchParams = useSearchParams();

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

  const { open: openSelectedCard } = useModalQuery({
    modalValue: "selected-card",
  });

  return (
    <section className="mt-[1.875rem] pl-4 md:px-4">
      <div className="flex items-center justify-between mb-[1.25rem]">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={() => changeHandler(id, title)}
          className="mr-4 md:mr-0 bg-[#F1F0F0] w-[1.625rem] h-[1.625rem] rounded-full flex items-center justify-center cursor-pointer"
        >
          <ArrowRightSVG />
        </button>
      </div>
      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide pr-4 md:pr-0  cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items?.map((card, index) => (
          <div
            onClick={() => {
              setSelectedProduct(card);
              openSelectedCard();
            }}
            key={`${card.id} ${card.name} ${index}`}
            className="min-w-[140px] cursor-pointer"
          >
            <div className="rounded-xl overflow-hidden mb-[0.5rem]  border border-[#e3e1e2]">
              <Image
                src={card.imagePath}
                alt={card.name}
                width={160}
                height={100}
                className="object-cover w-full h-[90px]"
              />
            </div>
            <div className="text-sm font-medium mb-[0.250rem] line-clamp-2">
              {card.name}
            </div>
            <div className="text-xs text-gray-500">{""}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardCategories;

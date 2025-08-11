"use client";
import { useGetCategoryItem } from "@/services/categoriesList";
import Header from "@/containers/categoryPage/components/Header";
import Image from "next/image";
import { useModalQuery } from "@/hooks/useModalQuery";
import { useProduct } from "@/context/productContext";

interface Props {
  id: string;
}

const CategoryDetailPage = ({ id }: Props) => {
  const { open: openSelectedCard } = useModalQuery({
    modalValue: "selected-card",
  });

  const { data } = useGetCategoryItem(id, {
    enabled: !!id,
  });

  const { setSelectedProduct } = useProduct();

  return (
    <main className="max-w-4xl mx-auto min-h-screen">
      <Header />
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 py-[2.25rem] px-4">
        {data?.data.map((card, index) => (
          <div
            key={`${card.id} ${index}`}
            className="min-w-[140px] cursor-pointer"
            onClick={() => {
              setSelectedProduct(card);
              openSelectedCard();
            }}
          >
            <div className="rounded-xl overflow-hidden border border-[#e3e1e2]">
              <Image
                src={card.imagePath}
                alt={card.name}
                width={160}
                height={100}
                className="object-cover w-full h-[90px]"
              />
            </div>
            <div className="mt-[0.5rem] text-sm font-medium  line-clamp-2">
              {card.name}
            </div>
            <div className="text-xs text-gray-500">{""}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CategoryDetailPage;

"use client";

import Categories from "./components/CategoryList";
import Header from "@/containers/categoriesListPage/components/Header";

import CardCategories from "./components/CardCategories";

import { useGetAllProductList } from "@/services/categoriesList";

const CategoriesListPage = () => {
  const { data } = useGetAllProductList();

  return (
    <main className="max-w-4xl mx-auto py-6">
      <Header />
      <Categories />

      {data?.map((item) =>
        item.products.length ? (
          <CardCategories
            key={`${item.id} ${item.name}`}
            id={item.id}
            title={item.name}
            items={item.products}
          />
        ) : null
      )}
    </main>
  );
};

export default CategoriesListPage;

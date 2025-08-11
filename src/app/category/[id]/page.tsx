import { use } from "react";
import CategoryDetailPage from "@/containers/categoryPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CategoryDetailsPage({ params }: Props) {
  const { id } = use(params);

  return <CategoryDetailPage id={id} />;
}

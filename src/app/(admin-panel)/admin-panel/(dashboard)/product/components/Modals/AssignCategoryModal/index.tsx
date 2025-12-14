import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useCreateProductTag } from "@/services/adminPanel";
import { useGetAllCategoriesList } from "@/services/categoriesList";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useMemo, useState } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const initialFormData = {
  category: "",
  sort: "",
};

const AssignCategoryModal: FC<Props> = ({ isOpen, close }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const { data } = useGetAllCategoriesList();
  const { mutateAsync } = useCreateProductTag();
  const toast = useToast();

  const categoryId = data?.find((item) => item.name === category)?.id;

  console.log(id, categoryId);

  const categoryItems = useMemo(() => {
    if (!data) return [];

    return Object.entries(data).map((item) => ({
      value: String(item[1].id),
      label: item[1].name,
    }));
  }, [data]);

  const [formData, setFormData] = useState({
    category: "",
    sort: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  useEffect(() => {
    if (categoryId) {
      setFormData((prev) => ({ ...prev, category: String(categoryId) }));
    }
  }, [categoryId]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitHandler = () => {
    if (id && formData.category) {
      mutateAsync({
        product_id: Number(id),
        tag_id: Number(formData.category),
        sort: formData.sort ? Number(formData.sort) : null,
      })
        .catch((err) => toast.error(err.message))
        .finally(() => close());
    }
  };

  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      <div className="flex flex-col items-center justify-center space-y-[1.5rem]">
        <h2 className="text-[1.375rem]">My QR Code</h2>
        <Select
          label="Category"
          options={categoryItems}
          value={formData.category}
          isFull
          onChange={(value) => handleChange("category", value as string)}
        />
        <TextField
          value={formData.sort}
          type="number"
          label="Sort"
          id="sort"
          onChange={(e) => handleChange("sort", e.target.value)}
        />

        <Button fullWidth disabled={!formData.category} onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </BottomSheetModal>
  );
};

export default AssignCategoryModal;

"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useGetCategoryDetail, useUpdateCategory } from "@/services/adminPanel";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategoryDetailPage() {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const toast = useToast();
  const { id } = useParams();
  const { back, push } = useRouter();

  const { data } = useGetCategoryDetail(id as string, {
    enabled: !!id,
  });

  const { mutateAsync } = useUpdateCategory(id as string);

  useEffect(() => {
    if (data) {
      setName(data.Name || "");
      setIsActive(!!data.isHome);
      setIsTop(!!data.IsTop);
    }
  }, [data]);

  // 📤 ارسال فرم
  const handleSubmit = async () => {
    try {
      await mutateAsync({
        Name: name || undefined, // اگر خالی بود undefined بشه
        isHome: isActive,
        IsTop: isTop,
      });

      toast.success("Category updated successfully.");
      push("/admin-panel/categories");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h2 className="font-bold text-2xl">Category Detail</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] rounded-2xl">
        <div className="flex flex-col gap-6">
          <TextField
            value={name}
            label="Category Name"
            id="categoryName"
            onChange={(event) => setName(event.target.value)}
          />

          <div className="flex items-center gap-2">
            <p>Show in Homepage</p>
            <Switch checked={isActive} onChange={setIsActive} size="md" />
          </div>

          <div className="flex items-center gap-2">
            <p>Show in Top</p>
            <Switch checked={isTop} onChange={setIsTop} size="md" />
          </div>
        </div>

        <Button disabled={!name} className="mt-6" onClick={handleSubmit}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

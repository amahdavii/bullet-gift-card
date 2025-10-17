"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useCreateCategory } from "@/services/adminPanel";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const toast = useToast();

  const { mutateAsync } = useCreateCategory();

  const { back, push } = useRouter();

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
      <div className="bg-white p-6 shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A]">
        <div className="flex flex-col gap-6">
          <TextField
            value={name}
            label="Category Name"
            id="categoryName"
            onChange={(event) => setName(event.target.value)}
          />

          <div className="flex items-center gap-2">
            <p>Show in Homepage</p>
            <Switch checked={isActive} onChange={setIsActive} size="md" />{" "}
          </div>
          <div className="flex items-center gap-2">
            <p>Show in Top</p>
            <Switch checked={isTop} onChange={setIsTop} size="md" />{" "}
          </div>
        </div>

        <Button
          disabled={!name}
          className="mt-6"
          onClick={() => {
            mutateAsync({
              Name: name,
              "widget-order": 1,
              isHome: isActive,
              IsTop: isTop,
              TagTypeId: 1,
            })
              .then(() => {
                toast.success("Category created successfully.");
                push("/admin-panel/categories");
              })
              .catch(() => {
                toast.error("An error occurred.");
              });
          }}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

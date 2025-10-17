"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useCreateStore, useGetUsaStates } from "@/services/adminPanel";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

export default function CreateStorePage() {
  const { back, push } = useRouter();
  const { data: statesData } = useGetUsaStates();
  const { mutateAsync } = useCreateStore();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "USA",
    is_active: true,
  });

  const stateOptions = useMemo(() => {
    if (!statesData) return [];
    return Object.entries(statesData).map(([name]) => ({
      value: name,
      label: name,
    }));
  }, [statesData]);

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    mutateAsync({
      address: formData.address,
      city: formData.address,
      country: formData.country,
      email: formData.email,
      is_active: formData.is_active,
      name: formData.name,
      owner: formData.owner,
      phone: formData.phone,
      postal_code: formData.postal_code,
      state: formData.state,
    })
      .then(() => {
        toast.success("User created successfully!");
        push("/admin-panel/store");
      })
      .catch((err) => {
        const error = err as ICreateUserError;

        if (error.errors) {
          Object.values(error.errors).forEach((messages) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else {
          toast.error(error.message || "An unexpected error occurred");
        }
      });
    console.log("🧾 Final FormData to POST:", formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h2 className="font-bold text-2xl">Create Store</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            value={formData.name ?? ""}
            label="Store Name"
            id="name"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            value={formData.owner ?? ""}
            label="Owner"
            id="owner"
            onChange={(e) => handleChange("owner", e.target.value)}
          />

          <TextField
            value={formData.email ?? ""}
            label="Email"
            id="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            value={formData.phone ?? ""}
            label="Phone"
            id="phone"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <TextField
            value={formData.address ?? ""}
            label="Address"
            id="address"
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <TextField
            value={formData.city ?? ""}
            label="City"
            id="city"
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <Select
            label="State/Region"
            options={stateOptions}
            value={formData.state ?? ""}
            isFull
            onChange={(value) => handleChange("state", value as string)}
          />

          <TextField
            value={formData.postal_code ?? ""}
            label="Postal Code"
            id="postal_code"
            onChange={(e) => handleChange("postal_code", e.target.value)}
          />

          <TextField
            value={formData.country ?? ""}
            label="Country"
            id="country"
            disabled
          />

          <div className="flex items-center gap-3 mt-2">
            <Switch
              checked={formData.is_active}
              onChange={(value) => handleChange("is_active", value)}
              size="md"
            />
            <span className="font-medium text-gray-700">Active Store</span>
          </div>
        </div>

        <Button className="mt-6" onClick={handleSubmit}>
          Save Store
        </Button>
      </div>
    </div>
  );
}

"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import {
  useGetStoreDetail,
  useGetUsaStates,
  useUpdateStore,
} from "@/services/adminPanel";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

export default function EditStorePage() {
  const { back, push } = useRouter();
  const { id } = useParams();

  const { data: statesData } = useGetUsaStates();
  const { mutateAsync } = useUpdateStore(id as string);
  const toast = useToast();
  const { data } = useGetStoreDetail(id as string, { enabled: !!id });

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

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        owner: data.owner || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        postal_code: data.postal_code || "",
        country: data.country || "USA",
        is_active: !!data.is_active,
      });
    }
  }, [data]);

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

  const handleSubmit = async () => {
    try {
      await mutateAsync({
        name: formData.name,
        address: formData.address,
        state: formData.state,
        postal_code: formData.postal_code,
        owner: formData.owner,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        is_active: formData.is_active,
      });

      toast.success("Store updated successfully!");
      push("/admin-panel/store");
    } catch (err) {
      const error = err as ICreateUserError;

      if (error.errors) {
        Object.values(error.errors).forEach((messages) => {
          messages.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    }

    console.log("🧾 Final FormData to POST:", formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h2 className="font-bold text-2xl">Edit Store</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            value={formData.name}
            label="Store Name"
            id="name"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            value={formData.owner}
            label="Owner"
            id="owner"
            onChange={(e) => handleChange("owner", e.target.value)}
          />

          <TextField
            value={formData.email}
            label="Email"
            id="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            value={formData.phone}
            label="Phone"
            id="phone"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <TextField
            value={formData.address}
            label="Address"
            id="address"
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <TextField
            value={formData.city}
            label="City"
            id="city"
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <Select
            label="State/Region"
            options={stateOptions}
            value={formData.state}
            isFull
            onChange={(value) => handleChange("state", value as string)}
          />

          <TextField
            value={formData.postal_code}
            label="Postal Code"
            id="postal_code"
            onChange={(e) => handleChange("postal_code", e.target.value)}
          />

          <TextField
            value={formData.country}
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
          Save Changes
        </Button>
      </div>
    </div>
  );
}

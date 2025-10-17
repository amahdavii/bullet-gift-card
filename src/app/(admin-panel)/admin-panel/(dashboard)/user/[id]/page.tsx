"use client";

import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import {
  useGetAllStores,
  useGetUserDetail,
  useUpdateUser,
} from "@/services/adminPanel";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserFormState {
  name: string;
  phone: string;
  email: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  store_id: number | null;
}

export default function EditUserPage() {
  const toast = useToast();
  const { id } = useParams();
  const { back, push } = useRouter();

  const { data } = useGetUserDetail(id as string, { enabled: !!id });
  const { data: storesList } = useGetAllStores();
  const { mutateAsync } = useUpdateUser(id as string);

  const [form, setForm] = useState<UserFormState>({
    name: "",
    phone: "",
    email: "",
    password: "",
    is_active: false,
    is_admin: false,
    store_id: null,
  });

  // پر کردن فرم با داده‌های موجود
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        password: "",
        is_active: data.is_active,
        is_admin: data.is_admin,
        store_id: data.store_id ?? null,
      });
    }
  }, [data]);

  const storeOptions =
    storesList?.map((store) => ({
      label: store.name,
      value: store.id.toString(),
    })) || [];

  const handleChange = <K extends keyof UserFormState>(
    field: K,
    value: UserFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = async () => {
    try {
      // فقط فیلدهای پر شده رو ارسال می‌کنیم
      const payload: Partial<ICreateUserBody> = {};
      if (form.name) payload.name = form.name;
      if (form.email) payload.email = form.email;
      if (form.password) payload.password = form.password;
      if (form.phone) payload.phone = form.phone;
      if (form.store_id !== null) payload.store_id = form.store_id;
      payload.is_active = form.is_active;
      payload.is_admin = form.is_admin;

      await mutateAsync(payload);

      toast.success("User updated successfully!");
      push("/admin-panel/user");
    } catch (err: unknown) {
      const error = err as ICreateUserError;
      if (error.errors) {
        Object.values(error.errors).forEach((messages) =>
          messages.forEach((msg) => toast.error(msg))
        );
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h2 className="font-bold text-2xl">User Detail</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A]">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            value={form.name ?? ""}
            label="Full Name"
            id="fullName"
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            value={form.phone ?? ""}
            label="Phone Number"
            id="phoneNumber"
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <TextField
            value={form.email ?? ""}
            label="Email"
            id="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            value={form.password ?? ""}
            label="Password"
            id="password"
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Select
            label="Store"
            value={form.store_id?.toString() ?? ""}
            options={storeOptions}
            onChange={(val) =>
              handleChange("store_id", val ? Number(val) : null)
            }
          />

          <div className="flex items-center gap-4">
            Is user active?
            <Switch
              checked={form.is_active}
              onChange={(val) => handleChange("is_active", val)}
              size="md"
            />
          </div>

          <div className="flex items-center gap-4">
            Is user admin?
            <Switch
              checked={form.is_admin}
              onChange={(val) => handleChange("is_admin", val)}
              size="md"
            />
          </div>
        </div>

        <Button className="mt-6" onClick={submitHandler}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

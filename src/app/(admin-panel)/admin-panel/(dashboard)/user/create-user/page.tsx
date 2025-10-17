"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useCreateUser, useGetAllStores } from "@/services/adminPanel";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
  const toast = useToast();

  const { back, push } = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [store, setStore] = useState<number | null>(null);

  const { mutateAsync } = useCreateUser();

  console.log(`isadmin: ${isAdmin} - isactive: ${isActive}`);

  const { data: storesList } = useGetAllStores();

  const storeOptions = storesList?.map((store) => ({
    label: store.name,
    value: store.id.toString(),
  }));

  const submitHandler = async () => {
    await mutateAsync({
      email,
      name: fullName,
      password,
      phone: phoneNumber,
      is_active: isActive,
      is_admin: isAdmin,
      store_id: store as number,
    })
      .then(() => {
        toast.success("User created successfully!");
        push("/admin-panel/user");
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
            value={fullName}
            label="Full Name"
            id="fullName"
            onChange={(event) => setFullName(event.target.value)}
          />

          <TextField
            value={phoneNumber}
            label="Phone Number"
            id="phoneNumber"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />

          <TextField
            value={email}
            label="Email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            value={password}
            label="Password"
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Select
            label="Store"
            options={storeOptions || []}
            onChange={(item) => setStore(Number(item))}
          />{" "}
          <div className="flex items-center gap-4">
            Is user active ?
            <Switch checked={isActive} onChange={setIsActive} size="md" />
          </div>
          <div className="flex items-center gap-4">
            Is user admin ?
            <Switch checked={isAdmin} onChange={setIsAdmin} size="md" />
          </div>
        </div>
        <Button className="mt-6" onClick={submitHandler}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

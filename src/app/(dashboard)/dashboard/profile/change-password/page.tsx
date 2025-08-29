"use client";
import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useStoreChangePassword } from "@/services/dashboard/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChangePasswordPage = () => {
  const { back, push } = useRouter();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const toast = useToast();
  const { mutate } = useStoreChangePassword({
    onSuccess: () => {
      toast.success("Password changed successfully.");
      localStorage.removeItem("accessToken");
      push("/login");
    },
    onError: () => {
      toast.error("An error occurred.");
    },
  });

  return (
    <div>
      <header className="bg-white flex justify-between items-center py-[0.875rem] px-[1.5rem]">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h3 className="font-semibold text-[#0C0A0C]">Change Password</h3>
        <span className="w-[1.5rem] h-[1.5rem]" />
      </header>

      <main className="mt-[0.5rem] bg-white h-[90vh] p-[1.5rem]">
        <h2 className="font-semibold mb-[2rem]">Choose a New Password</h2>
        <div className="flex flex-col gap-[1.5rem]">
          <TextField
            label="Current Password"
            value={currentPass}
            id="current-password"
            type="password"
            onChange={(event) => setCurrentPass(event.target.value)}
          />
          <TextField
            label="New Password"
            value={newPass}
            id="new-password"
            type="password"
            onChange={(event) => setNewPass(event.target.value)}
          />
          <TextField
            label="Confirm New Password"
            value={confirmNewPass}
            id="confirm-new-password"
            type="password"
            onChange={(event) => setConfirmNewPass(event.target.value)}
          />
        </div>
        <Button
          fullWidth
          className="mt-[2.5rem]"
          disabled={!newPass || !confirmNewPass || !currentPass}
          onClick={() =>
            mutate({
              confirm_new_password: confirmNewPass,
              current_password: currentPass,
              new_password: newPass,
            })
          }
        >
          Update Password
        </Button>
      </main>
    </div>
  );
};

export default ChangePasswordPage;

import { toast } from "react-hot-toast";

const useToast = () => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const loading = (message: string) => toast.loading(message);
  const dismiss = () => toast.dismiss();

  return {
    success,
    error,
    loading,
    dismiss,
  };
};

export default useToast;

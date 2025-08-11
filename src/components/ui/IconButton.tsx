import { FC, ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<IconButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="rounded-full cursor-pointer border border-transparent p-2.5 text-center text-sm text-slate-600 transition duration-150 ease-in-out hover:bg-gray-100 active:bg-gray-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;

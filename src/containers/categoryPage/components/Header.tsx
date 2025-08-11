import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import Search from "@/components/shared/Search";
import IconButton from "@/components/ui/IconButton";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "";

  return (
    <div className="px-4">
      <header className="flex justify-between items-center space-x-2 py-[0.875rem]">
        <IconButton onClick={() => push("/")}>
          <NarrowLeft />
        </IconButton>
        <h1 className="text-[1rem] font-semibold">{title}</h1>
        <div className="w-[38px] h-[32px]">&nbsp;</div>
      </header>
      <Search />
    </div>
  );
};

export default Header;

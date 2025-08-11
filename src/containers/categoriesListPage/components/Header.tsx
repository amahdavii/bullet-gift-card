import Search from "@/components/shared/Search";
import Image from "next/image";

const Header = () => {
  return (
    <div className="px-4">
      <header className="flex justify-center items-center space-x-2 ">
        <Image
          src="/assets/images/logo.svg"
          alt="BulletGiftCards"
          width={156}
          height={37}
        />
      </header>
      <Search />
    </div>
  );
};

export default Header;

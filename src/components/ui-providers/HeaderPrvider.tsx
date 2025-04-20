import { FC, ReactNode } from "react";

interface HeaderPrviderProps {
  children: ReactNode;
}

const HeaderPrvider: FC<HeaderPrviderProps> = ({ children }) => {
  return (
    <div className="bg-background mx-auto py-3  max-w-[1300px] px-3 ms:px-2 lg:px-5 xl:px-0 ">
      {children}
    </div>
  );
};

export default HeaderPrvider;

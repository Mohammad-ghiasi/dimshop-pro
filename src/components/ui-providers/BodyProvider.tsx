import { FC, ReactNode } from "react";

interface BodyPrviderProps {
  children: ReactNode;
}

const BodyPrvider: FC<BodyPrviderProps> = ({ children }) => {
  return (
    <div className="bg-background mx-auto  max-w-[1300px] px-4 ms:px-2 lg:px-5 xl:px-0 mt-24">
      {children}
    </div>
  );
};

export default BodyPrvider;

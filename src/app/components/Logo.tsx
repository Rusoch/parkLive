import Image from "next/image";
type TProps = {
  className?: string;
};

const Logo: React.FC<TProps> = () => {
  return <Image src="/mainLogo.svg" alt="the main logo" width={48} height={48} priority />;
};

export default Logo;

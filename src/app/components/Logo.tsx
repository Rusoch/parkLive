interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={`${className ?? ""} w-[36%] h-[47px] bg-[#D9D9D9] flex items-center justify-center`}
    >
      <div className="w-[77.5%] h-[63%] flex items-center justify-center p-[11px] ">Logo</div>
    </div>
  );
};

export default Logo;

type TProps = {
  className?: string;
};

const Logo: React.FC<TProps> = () => {
  return (
    <div className="h-[63%] flex items-center justify-center p-[11px] text-[32px] font-bold text-green-dark">
      Logo
    </div>
  );
};

export default Logo;

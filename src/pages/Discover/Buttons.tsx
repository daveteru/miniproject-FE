type buttonProps = {
  label?: string;
  setter?: React.Dispatch<React.SetStateAction<any>>;
  value?: string;
  selected?: string;
};

export default function YellowButton({
  label,
  setter,
  value,
  selected,
}: buttonProps) {
  const isActive = value === selected;

  return (
    <div
      onClick={() => {
        setter?.(value);
      }}
      className={`font-krona-one ${isActive ? "bg-amber-400" : "bg-[#E6FF06]"} hover:bg-amber-400 text-black px-5 w-fit h-fit py-2  rounded-full`}
    >
      {label}
    </div>
  );
}

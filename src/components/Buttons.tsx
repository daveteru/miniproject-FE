type buttonProps = {
  label?: string;
};

export default function YellowButton({ label }: buttonProps) {
  return <div className="font-krona-one bg-[#E6FF06] hover:bg-amber-400 text-black px-5 w-fit h-fit py-2 border rounded-full">{label}</div>;
}

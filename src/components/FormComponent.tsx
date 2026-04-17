type FormProps = {
  label: string;
  value: string;
  formFunction: (value: string) => void;
  editable?: boolean;
};

export default function FormText({
  label,
  value,
  formFunction,
  editable = true,
}: FormProps) {
  return (
    <div className="w-full h-fit flex flex-col">
      <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
        {label}
      </label>
      <input
        type="text"
        onChange={(e) => formFunction(e.target.value)}
        value={value}
        readOnly={!editable}
        className={`"w-full flex border rounded-lg ${editable ? "" : "bg-neutral-200"} border-neutral-300 text-sm px-4 py-2 disabled:bg-neutral-100 disabled:text-neutral-400"`}
      ></input>
    </div>
  );
}

export function FormDate({ label, value, formFunction }: FormProps) {
  return (
    <div className="w-full h-fit flex flex-col">
      <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
        {label}
      </label>
      <input
        type="date"
        onChange={(e) => formFunction(e.target.value)}
        value={value}
        className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
      ></input>
    </div>
  );
}

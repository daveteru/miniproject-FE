import React from "react";

type FormTextProps = {
  label: string;
  formFunction?: (value: string) => void;
  editable?: boolean;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly">;

const FormText = React.forwardRef<HTMLInputElement, FormTextProps>(
  ({ label, formFunction, editable = true, error, onChange, ...rest }, ref) => {
    return (
      <div className="w-full h-fit flex flex-col">
        <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
          {label}
        </label>
        <input
          type="text"
          ref={ref}
          readOnly={!editable}
          onChange={formFunction ? (e) => formFunction(e.target.value) : onChange}
          {...rest}
          className={`w-full flex border rounded-lg ${editable ? "" : "bg-neutral-200"} ${error ? "border-red-400" : "border-neutral-300"} text-sm px-4 py-2 disabled:bg-neutral-100 disabled:text-neutral-400`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);
FormText.displayName = "FormText";

export default FormText;

type FormDateProps = {
  label: string;
  formFunction?: (value: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const FormDate = React.forwardRef<HTMLInputElement, FormDateProps>(
  ({ label, formFunction, error, onChange, ...rest }, ref) => {
    return (
      <div className="w-full h-fit flex flex-col">
        <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
          {label}
        </label>
        <input
          type="date"
          ref={ref}
          onChange={formFunction ? (e) => formFunction(e.target.value) : onChange}
          {...rest}
          className={`w-full flex border rounded-lg ${error ? "border-red-400" : "border-neutral-300"} text-sm px-4 py-2`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);
FormDate.displayName = "FormDate";

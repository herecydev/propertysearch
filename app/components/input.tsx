import { ComponentPropsWithoutRef } from "react";

const Input = ({
  label,
  ...rest
}: {
  label: string;
} & ComponentPropsWithoutRef<"input">) => {
  return (
    <div className="my-5 flex flex-col gap-1">
      <label>{label}</label>
      <input
        {...rest}
        required
        className="border-2 border-emerald-200 py-1 text-center text-2xl focus:outline-none rounded-sm"
      />
    </div>
  );
};

export default Input;

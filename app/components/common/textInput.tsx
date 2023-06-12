import { ComponentPropsWithoutRef } from "react";

const TextInput = (props: ComponentPropsWithoutRef<"input">) => (
  <input
    {...props}
    className={`border-2 border-emerald-200 focus:border-emerald-400 focus-visible:border-emerald-400 outline-none rounded-md ${props.className}`}
  />
);

export default TextInput;

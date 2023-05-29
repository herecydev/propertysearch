import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => (
  <button className="bg-emerald-300 rounded-md px-4 py-2 font-bold">
    {children}
  </button>
);

export default Button;

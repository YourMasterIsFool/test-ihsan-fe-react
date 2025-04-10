import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const button = tv({
  base: "px-2 py-1 rounded-md cursor-pointer text-black lg:text-base font-light",
  variants: {
    color: {
      primary: "bg-blue-300 text-black hover:opacity-90",
      warning: "bg-orange-300 text-black hover:opacity-90",
      destructive: "bg-red-300 text-black hover:opacity-90",
    },
  },
  defaultVariants: {
    color: "primary",
  },
  compoundVariants: [
    {
      color: "primary",
      flat: true,
      class: "bg-blue-300/40",
    },
  ],
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} type={props.type} className={button(props)}>
      {props.children}
    </button>
  );
};

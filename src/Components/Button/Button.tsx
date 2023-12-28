import classes from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "primary" | "secondary";
  onClick?: () => void;
};

const Button = ({ children, type, onClick }: ButtonProps) => {
  return (
    <button
      className={`${
        type === "secondary" ? classes.secondary : classes.primary
      } ${classes.button}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

interface ILabelProps {
  className?: string;
  htmlFor?: string;
}

const Label: React.FC<React.PropsWithChildren<ILabelProps>> = ({ children, className, htmlFor }): JSX.Element => {
  return (
    <label className={`text-sm ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;

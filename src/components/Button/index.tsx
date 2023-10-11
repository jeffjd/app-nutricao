import { ButtonHTMLAttributes } from 'react';

type Tmodel = 'normal' | 'outline' | 'disabled';

type ButtonProps = {
  model?: Tmodel;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const modelButton = {
  normal: 'bg-blue-700 text-white hover:bg-blue-500',
  outline:
    'border-blue text-blue hover:bg-green hover:text-white hover:border-green',
  disabled:
    'bg-gray-300 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50',
};

const Button: React.FC<ButtonProps> = ({
  model = 'normal',
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold leading-6 shadow-sm transition ease-in-out border ${className} ${
        modelButton[disabled ? 'disabled' : model]
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

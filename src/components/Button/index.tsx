import { ButtonHTMLAttributes } from 'react';

type Tmodel = 'normal' | 'outline' | 'disabled';

type ButtonProps = {
  model?: Tmodel;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const modelButton = {
  normal:
    'flex w-full justify-center rounded-md bg-azulescurobotao px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-azulclarobotao focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  outline:
    'flex w-full justify-center rounded-md border border-azulescuro text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 transition duration-300 ease-in-out',
  disabled:
    'flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
};

const Button: React.FC<ButtonProps> = ({
  model = 'normal',
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`${disabled ? modelButton['disabled'] : modelButton[model]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
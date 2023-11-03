import { InputHTMLAttributes } from 'react';

type InputProps = {
  label: string;
  icon?: string | React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ label, icon, ...props }) => {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
          {...props}
        />
        {icon ? (
          <span className="absolute right-0 top-0 h-[35px] w-[75px] flex justify-center items-center bg-gray-500 text-white">            {icon}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Input;

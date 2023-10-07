import {InputHTMLAttributes} from 'react'
import { BiSearch } from 'react-icons/bi';

type InputSearchProps = {

} & InputHTMLAttributes<HTMLInputElement>;

const InputSearch: React.FC<InputSearchProps> = ({...props}) => {
  return (
    <div className="flex items-center bg-azulescuro p-2 max-w-6xl m-auto">
      <BiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Digite sua busca..."
        className="outline-none ml-2"
        {...props}
      />
    </div>
  );
};

export default InputSearch;
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight} from 'react-icons/fa';
import { useGlobalContext } from '../context/context';

const Buttons = () => {
  const { page, noOfPages, handlePage, loading } = useGlobalContext();

  return (
    <div className="btn-container">
      <button disabled={loading} onClick={() => handlePage('decrease')}>
      <FaLongArrowAltLeft size={20} />
      </button>
      <p>{page + 1} of {noOfPages}</p>
      <button disabled={loading} onClick={() => handlePage('increase')}>
      <FaLongArrowAltRight size={20} />
      </button>
    </div>
  )
}

export default Buttons

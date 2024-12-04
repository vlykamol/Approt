import './Header.css'
import { DisplayIcon, DownSVG } from '../SVGs/icons'
import { useState } from 'react'
import { useData } from '../../context/dataContext';

export default function Header() {
  const [isVisible, setIsVisinle] = useState(false);
  return (
    <div className='header'>
      <div className=' DisplayBtnContainer '>
        <button onClick={() => setIsVisinle(() => !isVisible)} className='DisplayBtn'>
            <span className='Icon'>
              <DisplayIcon />
            </span>
            <span>
              Display
            </span>
            <span className='Icon'>
              <DownSVG />
            </span>
        </button>
        {isVisible && <DropDown />}
      </div>
    </div>
  )
}

function DropDown() {

  const { groupBy, groups, setGroupBy, orderBy, orders, setOrderBy } = useData()

  return(
    <>
      <div className='DropDown boxShadow'>
        <div className='flex in-btwn'>
          Grouping
          <DropDownBtn options={groups} selectedOption={groupBy} setOption={setGroupBy} />
        </div>
        <div className='flex in-btwn'>
          Ordering
          <DropDownBtn options={orders} selectedOption={orderBy} setOption={setOrderBy} />
        </div>
      </div>
    </>
  )
}

function DropDownBtn({options, selectedOption, setOption}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  return(

    <>
    <div className='DropDownContainer w-100'>
      <button className='DropDownBtn' onClick={() => setIsOpen((prev) => !prev)}>
        {selectedOption}
        <DownSVG />
      </button>
      {isOpen && (
        <ul className='w-100'>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>

    </>
  )
}
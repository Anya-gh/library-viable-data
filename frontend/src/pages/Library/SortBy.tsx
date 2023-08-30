import { Dispatch, SetStateAction } from "react"

type SortByProps = {
  activeSort: string
  setActiveSort: Dispatch<SetStateAction<string>>
}

export default function SortBy ({activeSort, setActiveSort} : SortByProps) {
  return (
    <ul className='p-1 m-2 rounded-xl h-fit flex flex-row items-center list-none text-sm'>
      <div className='flex flex-row items-center'>
        <li key='all'>
          <button className={'lg:hover:cursor-pointer lg:hover:text-white rounded-xl mr-2 p-2 transition duration-200 ' + (activeSort === 'all' ? 'bg-sky-300' : 'bg-sky-500')} onClick={() => {setActiveSort('all')}}>
            <p>All</p>
          </button>
        </li>
        <li key='available'>
          <button className={'lg:hover:cursor-pointer lg:hover:text-white rounded-xl mr-2 p-2 transition duration-200 ' + (activeSort === 'available' ? 'bg-sky-300' : 'bg-sky-500')} onClick={() => {setActiveSort('available')}}>
            <p>Available</p>
          </button>
        </li>
        <li key='borrowed'>
          <button className={'lg:hover:cursor-pointer lg:hover:text-white rounded-xl mr-2 p-2 transition duration-200 ' + (activeSort === 'borrowed' ? 'bg-sky-300' : 'bg-sky-500')} onClick={() => {setActiveSort('borrowed')}}>
            <p>Borrowed</p>
          </button>
        </li>
        <li key='duetoday'>
          <button className={'lg:hover:cursor-pointer lg:hover:text-white rounded-xl mr-2 p-2 transition duration-200 ' + (activeSort === 'duetoday' ? 'bg-sky-300' : 'bg-sky-500')} onClick={() => {setActiveSort('duetoday')}}>
            <p>Due today</p>
          </button>
        </li>
      </div>
    </ul>
  )
}
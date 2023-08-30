import { booksResponse } from "./Library"
import bookicon from '../../assets/icons8-book-50.png'

type BookContentProps = {
  book: booksResponse,
  uid: number,
  bid: number
}


const onClickHandler = async (uid: number, bid: number) => {
  fetch("http://localhost:105/loan", {method: "POST", body: JSON.stringify({"uid": uid, "bid": bid})})  
}

export default function BookContent ( {book, uid, bid}: BookContentProps) {

  return (
    <>
    <li key={book.title} className='bg-gray-100 w-72 h-80 overflow-scroll rounded-xl p-10 m-10 flex flex-col items-start'>
      {book.image ? <img src={book.image} alt='bookicon' /> : <img src={bookicon} alt='bookicon' className='max-h-20 max-w-20 h-auto w-auto'/>}
      <h1 className='font-bold tracking-wide text-lg'>{book.title}</h1>
      <p>{book.description}</p>
      {book.uid ? 
      <div>
        <p className='tracking-widest text-sky-400'>LOANED</p>
        <p className='text-gray-400'>loaned by: {book.firstname} {book.lastname}</p>
        <p className='text-gray-400'>until: {book.returndate}</p>
      </div> 
      : 
      <button className='p-1 w-20 rounded-xl bg-sky-500 mb-10 lg:hover:cursor-pointer lg:hover:bg-sky-400 transition duration-200' onClick={() => {onClickHandler(uid, bid)}}>Loan</button>}
    </li>
    </>
  )
}
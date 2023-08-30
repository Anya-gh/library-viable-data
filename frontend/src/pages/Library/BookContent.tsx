import { booksResponse } from "./Library"
import bookicon from '../../assets/icons8-book-50.png'
import { useState } from "react"

type BookContentProps = {
  book: booksResponse,
  uid: number,
  bid: number
}

export default function BookContent ( {book, uid, bid}: BookContentProps) {

  const [loaned, setLoaned] = useState(false)

  const onClickHandler = async (uid: number, bid: number) => {
    fetch("http://localhost:105/loan", {method: "POST", body: JSON.stringify({"uid": uid, "bid": bid})}) 
    setLoaned(true)
  }

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
      <button className='p-1 w-20 my-2 rounded-xl bg-sky-500 mb-10 lg:hover:cursor-pointer lg:hover:bg-sky-400 transition duration-200' onClick={() => {onClickHandler(uid, bid)}}>Loan</button>}
      {loaned && <p>Thank you for using our service! Reload the page to see your new books.</p>}
    </li>
    </>
  )
}
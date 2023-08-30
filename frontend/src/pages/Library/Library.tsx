import { useSearchParams, useNavigate } from 'react-router-dom'
import logo from '../../assets/viable-data-logo.svg'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import SortBy from './SortBy'
import BookContent from './BookContent'

export type booksResponse = {
  title: string,
  description: string,
  firstname: string | null,
  lastname: string | null,
  email: string | null,
  returndate: string | null
  uid: number | null,
  bid: number,
  image: string | null
}

export default function Library() {

  const [user, setUser] = useState<jsonResponseBody | undefined>(undefined)
  const [searchParams, ] = useSearchParams()
  const [valid, setValid] = useState(true)
  const [books, setBooks] = useState<booksResponse[]>([])
  const [activeSort, setActiveSort] = useState('all')
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
  }

  type jsonResponseBody = {
    uid: number,
    firstname: string,
    lastname: string
  }

  type jsonResponse = {
    code: boolean,
    err: string,
    body: jsonResponseBody
  }

  const checkIfValidUser = async (email: string | null) => {
    const res = await fetch("http://localhost:105/requestInfo", {method: "POST", body: JSON.stringify({"email": email})})
    const data = await res.json() as jsonResponse
    setValid(data.code)
    if (data.code) {
      setUser(data.body)
    }
    return data.code
  }

  const getBooks = async () => {
    const res = await fetch("http://localhost:105/getBooks")
    const data = await res.json() as booksResponse[]
    setBooks(data)
  }

  useEffect(() => {
    if (!searchParams.get('user')) {
      setValid(false)
    }
    else {
      checkIfValidUser(searchParams.get('user'))
    }
  }, [searchParams, valid])

  useEffect(() => {
    getBooks()
  }, [])

  if (user) {
    return (
      <>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center'>
          <div className='w-screen h-[35rem] bg-home-library-bg bg-cover'>
            <div className='w-screen h-full bg-black bg-opacity-50 flex flex-col md:flex-row items-start md:items-center p-10'>
              <div className='flex flex-col'>
                <span className='flex flex-row items-center mb-2 lg:mb-4'>
                  <img src={logo} alt='logo' className='mr-5 max-h-20 max-w-20 h-auto w-auto'/>
                  <h1 className='tracking-widest text-2xl md:text-3xl lg:text-6xl font-bold text-white'>Viable Data Library</h1>
                </span>
                <p className='tracking-wide text-zinc-300 leading-tight'>There's never been a better time to start reading!</p>
              </div>
              <div className='flex flex-col mt-40 md:mt-0 md:ml-40'>
                <span className='mb-5'>
                <p className='text-gray-400 text-sm'>Signed in as</p>
                <p className='text-white font-bold text-3xl'>{user.firstname} {user.lastname}</p>
                </span>
                <button onClick={handleSignOut} className='py-2 px-4 rounded-xl bg-sky-500 mb-10 lg:hover:cursor-pointer lg:hover:bg-sky-400 transition duration-200'>Sign out</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mb-2'>
          <h1 className='text-4xl tracking-wide font-bold text-center mt-2'>Books</h1>
          <SortBy activeSort={activeSort} setActiveSort={setActiveSort}/>
        </div>
        <ul className='flex flex-row flex-wrap justify-evenly list-none'>
          {(() => {
            const filteredBooks = books.filter(book => {
              if (book.uid !== user.uid) {
                return book
              }
            }).filter(book => {
              if (activeSort === 'all') { return book }
              else if (activeSort === 'available' ) { if (book.uid === null) { return book }}
              else if (activeSort === 'borrowed' ) { if (book.uid !== null) { return book }}
              else if (activeSort === 'duetoday' ) { const date = new Date().toJSON().slice(0,10); if (book.returndate !== null && book.returndate === date) { return book }}
            })
            if (filteredBooks.length > 0) {
              return (
                filteredBooks.map(book => {
                return (
                  <BookContent book={book} uid={user.uid} bid={book.bid}/>
                )}))
            }
            else {
              return (
                <p className='text-gray-400 tracking-wide mb-20'>No books, sorry!</p>
              )
            }
            })()}
        </ul>
        <div className='flex flex-col items-center justify-center mb-10'>
          <h1 className='text-4xl tracking-wide font-bold text-center mt-2 mb-5'>Your Books</h1>
          <ul className='flex flex-row flex-wrap justify-evenly list-none'>
          {(() => {
            const filteredBooks = books.filter(book => {
              if (book.uid === user.uid) {
                return book
              }
            })
            if (filteredBooks.length > 0) {
              return (books.filter(book => {
              if (book.uid === user.uid) {
                return book
              }}).map(book => { return (<BookContent book={book} uid={user.uid} bid={book.bid}/>)
            }))}
          else {
            return (<p className='tracking-wide'>You don't have any books on loan!</p>)
          }
          })()}
          </ul>
        </div>
        <Footer />
      </div>

      </>
    )
  }
  else {
   return (<p className='text-red-400 text-center m-10'>You have accessed this page indirectly. Please login from the home page.</p>)
  }
}
import { useRef } from 'react'

export default function Home() {

  const formRef = useRef(null)
  
  const getReqHandler = () => {
    /*fetch("http://localhost:105/books", {method: "GET"})
    .then(res => res.json())
    .then(res => {console.log(res)})*/
  }

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current ? formRef.current : undefined)
    fetch("http://localhost:105/login", {method: "POST", body: formData})
    .then(res => res.json())
    .then(res => console.log(res))
  }
  return (
    <>
    <div className='w-screen flex flex-col items-center'>
      <h1 className='my-2 text-3xl'>Hello</h1>
      <button className='text-3xl border-2 border-black p-2 hover:bg-slate-400 transition duration-200 rounded-xl' onClick={getReqHandler}>get</button>
    </div>
    <form ref={formRef} className='w-screen flex flex-col items-center' action="/login" method="POST" onSubmit={handleLogin}>
      <div className='flex flex-row'>
        <input className='p-2 m-2 border-2 rounded-xl border-black' type="text" name="firstname" />
        <input className='p-2 m-2 border-2 rounded-xl border-black' type="text" name="lastname" />
      </div>
      <div className='flex flex-row'>
        <input className='p-2 m-2 border-2 rounded-xl border-black' type="text" name="email" />
        <input className='p-2 m-2 border-2 rounded-xl border-black' type="text" name="password" />
      </div>
      <input className='p-2 m-2 border-2 rounded-xl border-black' type="submit" value="Submit"/>
    </form>
    </>
  )
}

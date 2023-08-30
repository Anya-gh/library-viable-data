import { useRef } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

export default function Authentication() {

  const formRef = useRef(null)

  // active means signup, !active means login
  const [active, setActive] = useState('signup')

  const onClickHandler = () => {
    setActive(active => active === 'login' ? 'signup' : 'login')
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
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mt-10 bg-gray-200 h-60 p-3 rounded-md'>
        <h1 className='font-bold tracking-wide my-2'>{active === 'signup' ? "Sign up" : "Log in"}</h1>
        <form ref={formRef} className='flex flex-col items-center' action="/login" method="POST" onSubmit={handleLogin}>
          <div className='flex flex-col'>
            <div className='overflow-hidden'></div>
            <AnimatePresence mode='wait'>
              <motion.div key={active} className='flex flex-row justify-between' initial={{height: 0, opacity: 0}} animate={{height: "auto", opacity: 1, transition: {duration: 0.2}}} exit={{height: 0, opacity: 0, transition: {duration: 0.2}}}>
              {active === 'signup' && <input className='p-2 my-2 mr-2 rounded-xl border-white w-[20.5rem] overflow-scroll lg:hover:bg-gray-100 transition duration-200' type="text" name="fullname" placeholder="Full name"/>}
              </motion.div>
            </AnimatePresence>
            <div className='flex flex-row mb-3'>
              <InputElement text={"Email"} name="email" />
              <InputElement text={"Password"} name="password" />
            </div>
          </div>
          <input className='py-2 px-4 m-2 rounded-xl bg-sky-500 mb-10 lg:hover:cursor-pointer lg:hover:bg-sky-400 transition duration-200' type="submit" value={active === 'signup' ? 'Sign up' : 'Log in'}/>
        </form>
      </div>
      {active === 'signup' ? <p className='text-zinc-400'>Already registered? Click <button className='text-sky-400 lg:hover:text-sky-600 transition duration-200' onClick={onClickHandler}>here</button> to log in.</p> : <p className='text-zinc-400'>Need an account? Click <button className='text-sky-400 lg:hover:text-sky-600 transition duration-200' onClick={onClickHandler}>here</button> to sign up.</p>}
    </div>
    
    </>
  )
}

type InputElementProps = {
  text: string,
  name: string
}

const InputElement = ( {text, name} : InputElementProps) => {
  return (
    <input className='p-2 my-2 mr-2 rounded-xl border-white w-40 overflow-scroll lg:hover:bg-gray-100 transition duration-200' type="text" name={name} placeholder={text}/>
  )
}
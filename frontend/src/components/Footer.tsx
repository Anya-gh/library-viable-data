import logo from '../assets/viable-data-logo.svg'

export default function Footer() {
  return (
    <div className='w-screen bg-gray-200 flex flex-col md:flex-row justify-evenly p-10 min-h-[15rem] mr-5'>
      <div className="flex flex-col">
        <h1 className='font-bold text-3xl md:text-xl lg:text-3xl'>Contact Us</h1>
        <span className='flex flex-row'>
          <InputElement text="Full Name" name="fullname" />
          <InputElement text="Email" name="email" />
        </span>
        <input className='p-2 my-2 rounded-xl w-[16.5rem] md:w-[10.5rem] lg:w-[16.5rem] md:text-sm lg:text-base h-20 overflow-scroll' type="text" name="message" placeholder="Your message here"/>
        <button className='p-2 my-2 bg-sky-400 rounded-xl w-20'>Send</button>
      </div>
      <div className='flex flex-col mt-5 md:mt-0'>
        <span className='flex flex-row items-center'><img src={logo} alt='logo' className='max-h-10 max-w-10 h-auto w-auto mr-2'/><h1 className='font-bold text-xl'>Viable Data Library</h1></span>
        <p className='text-gray-500'>Telephone: +44 1234 567890</p>
        <p className='text-gray-500'>Email: viabledata@library.com</p>
      </div>
      <div className="flex flex-col mt-5 md:text-sm lg:text-base">
        <span className="flex flex-row"><p className='text-gray-500'><a className='text-sky-700' target="_blank" href="https://icons8.com/icon/KlAC5P1TnEXu/brain">Brain</a> icon by <a className='text-sky-700' target="_blank" href="https://icons8.com">Icons8</a></p></span>
        <p className='text-gray-500'><a className='text-sky-700' target="_blank" href="https://icons8.com/icon/59040/inscription">Note</a> icon by <a className='text-sky-700' target="_blank" href="https://icons8.com">Icons8</a></p>
        <p className='text-gray-500'><a className='text-sky-700' target="_blank" href="https://icons8.com/icon/2325/floating-guru">meditate</a> icon by <a className='text-sky-700' target="_blank" href="https://icons8.com">Icons8</a></p>
      </div>
      
    </div>
  )
}

type InputElementProps = {
  text: string,
  name: string
}

const InputElement = ( {text, name} : InputElementProps) => {
  return (
    <input className='p-2 my-2 mr-2 rounded-xl w-32 md:w-20 lg:w-32 overflow-scroll md:text-sm lg:text-base' type="text" name={name} placeholder={text}/>
  )
}
import { useState } from 'react'
import placeholder from '../../assets/profile-placeholder.svg'
import arrow from '../../assets/dropdown.svg'
import { motion, AnimatePresence } from 'framer-motion'

export default function Testimonies() {

  const [index, setIndex] = useState(0)

  const onClickHandler = ( direction:number ) => {
    if (direction === 1) {
      setIndex(index => index === testimoniesArray.length - 1 ? 0 : index + 1)
    }
    else if (direction === -1) {
      setIndex(index => index === 0 ? testimoniesArray.length - 1 : index - 1)
    }
    else {
      console.error("Index changed outside of buttons.");
      
    }
  }

  type TestimoniesArrayType = {
    name: string,
    role: string,
    review: string
  }

  const testimoniesArray: TestimoniesArrayType[] = [
    {
      name: "Jimmy Buckets", 
      role: "Software Engineer",
      review: "Completely changed my perspective on reading. Don't know how I went so long without books! Would highly recommend - very simple to use service, and has all the books I'll ever want."
    },
    {
      name: "Allen Ifersun",
      role: "Quality Control",
      review: "Before I started reading, I never knew how much I was missing out on. My skills have improved rapidly since I picked up this hobby, and it fits into my schedule perfectly. Viable Data Library makes finding the perfect books for new techniques in quality control a breeze."
    }
  ]

  return (
    <>
      <div className='w-screen flex flex-col items-center mt-10'>
        <p className='text-gray-400'>See what people are saying...</p>
        <div className='flex flex-row bg-gray-100 p-10 m-5 h-80 w-[90%]'>
          <button className='flex-shrink-0' onClick={() => onClickHandler(-1)}><img src={arrow} alt='arrow' className='-rotate-90 h-10'/></button>
          <AnimatePresence mode='wait'>
            <motion.div key={index} className='flex flex-col items-center mx-10' initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}} exit={{opacity: 0, transition: {duration: 0.2}}}>
              <div className='flex flex-row m-5'>
                <img src={placeholder} alt='image' className='max-h-20 max-w-20 h-auto w-auto mr-5'/>
                <span className='flex flex-col'>
                  <h1 className='font-bold text-xl'>{testimoniesArray[index].name}</h1>
                  <h1>{testimoniesArray[index].role}</h1>
                </span>
              </div>
              <p>{testimoniesArray[index].review}</p>
            </motion.div>
          </AnimatePresence>
          <button className='flex-shrink-0' onClick={() => onClickHandler(1)}><img src={arrow} alt='arrow' className='rotate-90 h-10'/></button>
        </div>
      </div>
      
    </>
  )
}
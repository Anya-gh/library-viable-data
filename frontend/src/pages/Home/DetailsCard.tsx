import { useEffect, useState } from "react"
import placeholder from '../../assets/pexels-element-digital-1370298.jpg'

type DetailsCardProps = {
  imagePath: string,
  title: string,
  description: string
}

export default function DetailsCard( {imagePath, title, description} : DetailsCardProps) {

  const [image, setImage] = useState(placeholder)
  useEffect(() => { setImage(imagePath) }, [imagePath])

  return (
    <div className='flex flex-col p-5 bg-gray-100 mx-5 my-2 w-auto md:w-52 lg:w-96 h-80 rounded-md items-center overflow-scroll'>
      <img src={image} alt='image' className='h-24'></img>
      <span className='flex flex-col mt-2 h-full'>
        <h1 className='font-bold text-xl text-center mb-5'>{title}</h1>
        <p className='text-center'>{description}</p>
      </span>
    </div>
  )
} 

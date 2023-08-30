import Authentication from './Authentication'
import DetailsCard from './DetailsCard'
import Footer from '../../components/Footer'
import Testimonies from './Testimonies'
import logo from '../../assets/viable-data-logo.svg'
import brain from '../../assets/icons8-brain-64.png'
import note from '../../assets/icons8-note-50.png'
import meditate from '../../assets/icons8-meditate-50.png'

export default function Home() {

  return (
    <>
    <div className='flex flex-col items-center'>
      <div className='w-screen h-[35rem] bg-home-library-bg bg-cover'>
        <div className='w-screen h-full bg-black bg-opacity-50 flex flex-col md:flex-row justify-between items-center p-10'>
          <div className='flex flex-col'>
            <span className='flex flex-row items-center mb-2 lg:mb-4'>
              <img src={logo} alt='logo' className='mr-5 max-h-20 max-w-20 h-auto w-auto'/>
              <h1 className='tracking-widest text-2xl md:text-3xl lg:text-6xl font-bold text-white'>Viable Data Library</h1>
            </span>
            <p className='tracking-wide text-zinc-300 leading-tight'>There's never been a better time to start reading!</p>
          </div>
          <Authentication />
        </div>
      </div>
      <div className='flex flex-col mt-10'>
        <h1 className='md:text-2xl text-xl tracking-wide font-bold text-center mb-2'>Why use Viable Data Library?</h1>
        <div className='flex flex-col md:flex-row'>
          <DetailsCard title='Intellect' description="Studies show that reading improves brain matter, and can lead to higher IQ with consistent reading;  there's always something to learn after all!" imagePath={brain} />
          <DetailsCard title='Productivity' description="Reading has been shown to make people more productive. Maintaining your focus on a single passage of text helps focus your mind in the rest of your day, and will make you less distracted." imagePath={note} />
          <DetailsCard title='Mental health' description="Participating in an activity like reading can help you calm your mind, and develop a healthier relationship with your emotions." imagePath={meditate} />
        </div>
      </div>
      <Testimonies />
      <Footer />
    </div>
    </>
  )
}
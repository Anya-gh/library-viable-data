import './App.css'
import Home from './pages/Home'
import Library from './pages/Library'
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {

  const location = useLocation()

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='' element={<Home />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import IceCream from './pages/IceCream'
import Coffee from './pages/Coffee'
import Reservation from './pages/Reservation'
import Admin from './pages/Admin'
import Loader from './components/Loader'
import { useState } from 'react'

function App() {
  // Only show loader if it hasn't been shown this session
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('loaderShown')
  )

  const handleLoaderDone = () => {
    sessionStorage.setItem('loaderShown', 'true')
    setLoading(false)
  }

  return (
    <BrowserRouter>
      {loading && <Loader setLoading={handleLoaderDone} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/icecream" element={<IceCream />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './components/home/Home.jsx'
import Details from './components/details/Details.jsx'
import AllMovies from './components/catalog/AllMovies.jsx'
import AllSeries from './components/catalog/AllSeries.jsx'
import NotFound from './components/not-found/NotFound.jsx'

function App() {

  return (
    <>
      <NavBar />
      <main className="bg-[#05011d] min-h-screen ">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/:type/:id' element={<Details />} />
          <Route path='/movies' element={<AllMovies />} />
          <Route path='/series' element={<AllSeries />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

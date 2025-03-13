
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './components/home/Home.jsx'

function App() {

  return (
    <>
    <NavBar/>
    <main className="bg-[#05011d] min-h-screen">
      <Routes>
        <Route index element={<Home/>}/>
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App

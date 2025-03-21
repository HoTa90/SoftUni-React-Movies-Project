
import { Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './components/home/Home.jsx'
import Details from './components/details/Details.jsx'
import AllMovies from './components/catalog/AllMovies.jsx'
import AllSeries from './components/catalog/AllSeries.jsx'
import NotFound from './components/not-found/NotFound.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import RegisterPage from './components/home/RegisterPage.jsx'
import LoginPage from './components/home/LoginPage.jsx'
import WatchList from './components/Watchlist.jsx'
import EditReview from './components/details/reviews/EditReview.jsx'
import AllReviews from './components/details/reviews/AllReviews.jsx'

function App() {

  return (
    <AuthProvider>
      <NavBar />
      <main className="bg-[#05011d] min-h-screen ">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/:type/:id' element={<Details />} />
          <Route path='/:type/:id/edit/:reviewId' element={<EditReview />} />
          <Route path='/:type/:id/reviews' element={<AllReviews />} />
          <Route path='/movies' element={<AllMovies />} />
          <Route path='/series' element={<AllSeries />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/:username/watchlist' element={<WatchList />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  )
}

export default App

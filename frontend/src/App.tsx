import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"

import BookingForm from "./services/BookingForm"
import SearchForm from './services/SearchForm'
import Confirmation from './services/Confirmation'
import BusList from './services/BusList'

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/searchForm" element={<SearchForm />} />
        <Route path="/busList" element={<BusList />} />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  )
}

export default App

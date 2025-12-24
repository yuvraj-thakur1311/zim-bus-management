import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"

import BookingForm from "./services/BookingForm"
import SearchForm from './services/SearchForm'
import Confirmation from './services/Confirmation'
import BusList from './services/BusList'
import Home from './services/Home'

import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchForm" element={<SearchForm />} />
          <Route path="/busList" element={<BusList />} />
          <Route path="/bookingForm" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
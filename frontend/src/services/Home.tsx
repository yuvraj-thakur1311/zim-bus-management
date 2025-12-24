import React from 'react';
import "../App.css";
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="homepage">
      <main className="hero">
        <h1>Welcome to Bus Management System</h1>
        <p className="tagline">
          Simple | Fast | Reliable bus booking experience
        </p>

        <p className="description">
          Plan your journey with ease. Search buses, compare routes,
          book tickets, and travel comfortably with our smart bus
          management system.
        </p>

        <div className="features">
          <div className="feature-card">🚌 Easy Bus Search</div>
          <div className="feature-card">📅 Quick Booking</div>
          <div className="feature-card">✅ Instant Confirmation</div>
        </div>

        <p className="happy">Happy Journey & Safe Travels </p>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;

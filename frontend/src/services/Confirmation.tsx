import React, { useState, useEffect } from "react";
import "../App.css";

interface Booking {
  id: string;
  busId: number;
  source: string;
  destination: string;
  fare: number;
  seatsAvailable: number;
  bookedAt: string;
}

const Confirmation: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    // Initialize state from localStorage
    const savedBookings = localStorage.getItem("busBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    // Listen for custom storage events to update in real-time
    const handleStorageChange = () => {
      const updatedBookings = localStorage.getItem("busBookings");
      if (updatedBookings) {
        setBookings(JSON.parse(updatedBookings));
      } else {
        setBookings([]);
      }
    };

    window.addEventListener("bookingUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("bookingUpdated", handleStorageChange);
    };
  }, []);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all bookings?")) {
      localStorage.removeItem("busBookings");
      setBookings([]);
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookings.filter((b) => b.id !== bookingId);
      localStorage.setItem("busBookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="confirmation-container">
        <div className="empty-state">
          <h2>No Bookings Yet</h2>
          <p>You haven't made any bus bookings yet.</p>
          <p>Go to the Booking page to book your first ticket!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <h1>All Bookings ({bookings.length})</h1>
        <button onClick={handleClearAll} className="clear-all-btn">
          Clear All
        </button>
      </div>

      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-card-header">
              <h3>Booking ID: {booking.id}</h3>
              <span className="status-badge">Confirmed</span>
            </div>

            <div className="booking-details">
              <div className="detail-row">
                <span className="label">Bus ID:</span>
                <span className="value">#{booking.busId}</span>
              </div>

              <div className="detail-row">
                <span className="label">From:</span>
                <span className="value">{booking.source}</span>
              </div>

              <div className="detail-row">
                <span className="label">To:</span>
                <span className="value">{booking.destination}</span>
              </div>

              <div className="detail-row">
                <span className="label">Fare:</span>
                <span className="value fare">₹{booking.fare}</span>
              </div>

              <div className="detail-row">
                <span className="label">Seats Remaining:</span>
                <span className="value">{booking.seatsAvailable}</span>
              </div>

              <div className="detail-row">
                <span className="label">Booked At:</span>
                <span className="value">{booking.bookedAt}</span>
              </div>
            </div>

            <button
              onClick={() => handleDeleteBooking(booking.id)}
              className="delete-booking-btn"
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Confirmation;
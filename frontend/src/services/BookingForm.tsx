import React, { useState } from "react";
import { bookBusSeat } from "../api/api";
import axios from "axios";
import "../App.css";

interface BookingProps {
  onSuccessBooking?: (busId: number) => void;
}

interface Booking {
  id: string;
  busId: number;
  source: string;
  destination: string;
  fare: number;
  seatsAvailable: number;
  bookedAt: string;
}

const BookingForm: React.FC<BookingProps> = ({ onSuccessBooking }) => {
  const [busId, setBusId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!busId) {
      setError("Bus ID is required");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await bookBusSeat(Number(busId));
      const bookedAt = new Date().toLocaleString();

      const newBooking: Booking = {
        id: `BK${Date.now()}`,
        busId: response.data.id,
        source: response.data.source,
        destination: response.data.destination,
        fare: response.data.fare,
        seatsAvailable: response.data.seatsAvailable,
        bookedAt: bookedAt,
      };

      const existingBookings = localStorage.getItem("busBookings");
      const bookings: Booking[] = existingBookings
        ? JSON.parse(existingBookings)
        : [];
      bookings.push(newBooking);
      localStorage.setItem("busBookings", JSON.stringify(bookings));

      window.dispatchEvent(new Event("bookingUpdated"));

      setSuccess("Ticket booked successfully!");

      if (onSuccessBooking) {
        onSuccessBooking(Number(busId));
      }

      setBusId("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      console.error(err);
    
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Booking failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Booking failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleBooking} className="booking-form">
        <h2>Book a Bus Seat</h2>

        <input
          type="number"
          placeholder="Enter Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Seat"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
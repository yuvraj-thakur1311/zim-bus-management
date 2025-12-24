import React, { useEffect, useState } from "react";
import type { Bus } from "../types/types";
import { getBuses } from "../api/api";
import "../App.css"

const BusList: React.FC = () => {
  const [bus, setBus] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getBuses()
      .then((data) => {
        setBus(data);
        setLoading(false);
      })
      .catch((err) => {
        setError( err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading buses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="bus-list-container">
      <h1>Bus List</h1>
      <ul>
        {bus.map((b: Bus) => (
          <li key={b.id}>
            <strong>Id:</strong> {b.id} | <strong>Source:</strong> {b.source} |{" "}
            <strong>Destination:</strong> {b.destination} | <strong>Fare:</strong>{" "}
            {b.fare} | <strong>Seats Available:</strong> {b.seatsAvailable}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;

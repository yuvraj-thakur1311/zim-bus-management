import React, { useState } from "react";
import { searchBus } from "../api/api";
import type { Bus } from "../types/types"
import axios from "axios";
import "../App.css"

const SearchForm: React.FC = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const handleSearch = async (): Promise<void> => {
    if (!source || !destination) {
      setError("Please enter both source and destination");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data: Bus[] = await searchBus(source, destination);
      setBuses(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Request failed");
      } else {
        setError("Unexpected error occurred");
      }
    }finally {
          setLoading(false);
        }
      };

 return (
    <>
      <div className="page-container">
        <div className="mainDiv">
          <h2 className="head">Search your dream bus here</h2>

          <input
            type="text"
            placeholder="Enter source location"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="search1"
          />

          <input
            type="text"
            placeholder="Enter destination location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search1"
          />

          <button onClick={handleSearch} className="btn">
            Search
          </button>

          {loading && <p>Loading buses...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {buses.length > 0 && (
            <ul className="srcUl">
              {buses.map((bus) => (
                <li key={bus.id} className="searchLI">
                  {bus.source} → {bus.destination}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </>
  );
};
export default SearchForm;

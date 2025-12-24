import axios from "axios";
import type { Bus } from "../types/types";

const API_URL = "http://localhost:5000/details";

export const getBuses = async() => {

    try{
         const res = await axios.get(`${API_URL}/buses`);
         return res.data;

    }catch(error){
        console.error("Error fetching buses:", error);
        throw error;
    }
}

export const bookBusSeat = async (id: number) => {
  const res = await axios.post(`${API_URL}/book/${id}`);

  if (res.status !== 200) {
    throw new Error("Booking failed");
  }

  return res.data;
};


export const searchBus = async (
  source: string,
  destination: string
): Promise<Bus[]> => {
  const res = await axios.get(
    `${API_URL}/bus/search?source=${encodeURIComponent(
      source
    )}&destination=${encodeURIComponent(destination)}`
  );

  return res.data.data; 
};

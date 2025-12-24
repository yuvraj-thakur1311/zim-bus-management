import axios from "axios";

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

export const bookBusSeat = async(id: number) => {

    try {
        const res = await axios.post(`${API_URL}/book/${id}`);
        return res.data;

    } catch (error) {
        console.error("Error booking buses:", error);
        throw error;
    }

}

export const searchBus = async(source: string, destination:string) => {

    try {
         const res = await axios.get(`${API_URL}/bus/search?source=${source}&destination=${destination}`);
         return res.data;

    } catch (error) {
        console.error("Error searching buses:", error);
        throw error;
    }

}
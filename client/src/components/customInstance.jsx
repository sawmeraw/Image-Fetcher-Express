import axios from "axios";

const fetchData = axios.create({
  baseURL: "https://image-fetcher-express.vercel.app",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetchData;

import axios from "axios";

const fetchData = axios.create({
  // baseURL: "https://image-fetcher-express.vercel.app",
  baseURL: "http://localhost:5000",
});

export default fetchData;

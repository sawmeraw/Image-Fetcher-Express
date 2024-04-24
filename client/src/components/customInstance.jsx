import axios from "axios";

const fetchData = axios.create({
  baseURL: "https://image-fetcher-express.vercel.app",
});

export default fetchData;

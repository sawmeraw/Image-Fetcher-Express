import axios from "axios";

const fetchData = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default fetchData;

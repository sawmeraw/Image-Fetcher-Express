import axios from "axios";

const fetchData = axios.create({
  baseURL: "http://localhost:5000/",
});

export default fetchData;

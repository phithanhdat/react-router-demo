import axios from "axios";


const apiCaller = axios.create({baseURL: 'http://localhost:3001'})

export default apiCaller;
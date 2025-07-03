import axios from "axios";
const Token = localStorage.getItem('Usertoken')
const AuthToken = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL ,
   headers: {
      Authorization: `Bearer ${Token}`,
   },
})
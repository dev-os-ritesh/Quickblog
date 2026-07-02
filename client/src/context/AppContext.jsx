import { Children, createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppProvider = ({children}) =>{

    const navigate = useNavigate();

    const [token,setToken] = useState(null);
    const [blogs,setBlogs] = useState([]);
    const [input,setInput] = useState(""); 

    const fetchBlogs = async()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    }

    useEffect(()=>{
        fetchBlogs();
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        }
    },[])

    //the values to be passed to all the components , which can be used 
    const value = {
            axios,navigate,token,setToken,blogs,setBlogs,input,setInput,fetchBlogs,logout
        }
    
        
    //to provide the data to all the components through value
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}
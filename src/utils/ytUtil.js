import axios from "axios";
import { YOUTUBE_API_KEY } from "../config/secret";

export const fetchYoutube = keywords => {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = {
        key: YOUTUBE_API_KEY,
        type: "video",
        q: "",
        part: "snippet",
        maxResults: 20
    };
    
    return axios.get(url, { params })
        .then(res => { 
            return res.data;
        });
};

 

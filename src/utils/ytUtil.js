import axios from "axios";
import { YOUTUBE_API_KEY } from "../config/secret";

export const fetchYoutube = keywords => {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = {
        key: YOUTUBE_API_KEY,
        type: "video",
        q: keywords,
        part: "snippet",
        maxResults: 20
    };
    
    return axios.get(url, { params })
            .then(res => { 
                return res.data;
            });
};

export const getMostPopularVideos = videoId => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
        key: YOUTUBE_API_KEY,
        chart: "mostPopular",
        regionCode: "US",
        part: "snippet,contentDetails,statistics",
        maxResults: 20,
        videoCategoryId: "",
    };

    return axios.get(url, { params })
            .then(res => {
                return res.data;
            })
}

export const getVideoInfo = videoId => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
        key: YOUTUBE_API_KEY,
        part:"snippet,contentDetails,statistics",
        videoCategoryId: "",
        id: videoId
    };

    return axios.get(url, { params })
            .then(res => {
                return res.data;
            });
};

export const fetchVideoComment = videoId => {
    const url = "https://www.googleapis.com/youtube/v3/commentThreads";
    const params = {
        key: YOUTUBE_API_KEY,
        part: "snippet,replies",
        videoId: videoId,
        textFormat: "plainText",
        maxResults: 50
    };

    return axios.get(url, { params })
            .then(res => {
                return res.data;
            });
};

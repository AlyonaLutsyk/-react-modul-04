import axios from "axios";


axios.defaults.baseURL = "http://hn.algolia.com/api/v1";

export const fetchArticles = async (topic, page) => {
    const response = await axios.get("/search", {
        params: {
            query: topic,
            page,
            hitsPerPage: 5
        },
    });
    return {
        articles: response.data.hits,
        totalPages: response.data.nbPages,
    };
};
        


// ?query=${topic}&page=${page}&hitsPerPage=5`
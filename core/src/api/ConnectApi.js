import { useEffect, useState } from 'react';
import axios from 'axios';

const useCollectData = (url) => {
    const [fetch, setFetching] = useState({ isFetching: false });
    const [dataState, setDataState] = useState({ data: [] });
    const [apiurl] = useState(url);

    useEffect(() => {
        const fetchDataFromApi = async () => {

            try{
                setFetching({isFectching: true})

                const response = await axios.get(apiurl)

                setDataState({...dataState, data: response.data});

            } catch (e) {
                setFetching({ ...fetch, isFetching: true})
            }
        };
        fetchDataFromApi();

    }, []);

    return [dataState]

};

export default useCollectData
import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";

function useFetch(limit, page, id, setImage, setEmpty) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const [list, setList] = useState([]);

    const sendQuery = useCallback(async () => {
        try {
            await setLoading(true);
            await setError(false);
            const result = await api.getImageLogsById(id, limit, page);
            const {status, logs, image, message, error: errorMessage} = result;

            if(status){
                await setList((prev) => [
                    ...new Set([...prev, ...logs])
                ]);
            }

            if(!status && errorMessage){
                setError(errorMessage);
                setEmpty(true);
            }else if(!status && message){
                setFinish(true);
                setError(message);
            }

            if(image){
                setImage(image);
            }

            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }, [page]);

    useEffect(() => {
        sendQuery();
    }, [sendQuery, page]);

    return {loading, error, logs: list, finish};
}

export default useFetch;
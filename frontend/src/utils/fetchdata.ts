import { FetchDataOptions } from '../types/fetchtypes';

const fetchData = async (options: FetchDataOptions) => {
    const { endpoint, method, data } = options;
    const headers = {'Content-Type':'application/json'}
    const datas = await fetch(endpoint, {method: method, headers:headers, body: JSON.stringify(data)})
    .then(async (res) => {
        const response = JSON.parse(await res.json());
        return response;
    })
    .catch ((error) => {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw error;
        }
    });

    return datas;
};

export default fetchData;

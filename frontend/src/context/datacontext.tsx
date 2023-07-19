import { createContext, useState, useEffect } from 'react';
import {
    DataItem,
    DataContextValue,
    DataProviderProps,
} from '../types/datatypes';
import fetchData from '../utils/fetchdata';

export const DataContext = createContext<DataContextValue>({
    dataList: [],
    setDataList: () => {},
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [dataList, setDataList] = useState<DataItem[]>([]);

    const fetchDataList = async () => {
        try {
            const datas = await fetchData({endpoint: '/machine/getall', method: 'GET'});
            setDataList(datas);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchDataList();
    }, []);

    return (
        <DataContext.Provider value={{dataList, setDataList}}>{children}</DataContext.Provider>
    );
};

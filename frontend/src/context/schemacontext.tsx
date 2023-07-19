import React from 'react';
import { createContext, useState, useEffect } from 'react';
import {
    SchemaContextValue,
    SchemaProviderProps,
} from '../types/schematypes';
import fetchData from '../utils/fetchdata';

export const SchemaContext = createContext<SchemaContextValue>({
    schema: Object,
});

export const SchemaProvider: React.FC<SchemaProviderProps> = ({ children }) => {
    const [schema, setSchema] = useState({});

    const fetchSchemaFunc = async () => {
        try {
            const data = await fetchData({endpoint: '/machine/schema/create', method: 'GET'});
            setSchema(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchSchemaFunc();
    }, []);

    return (
        <SchemaContext.Provider value={{schema}}>{children}</SchemaContext.Provider>
    );
};

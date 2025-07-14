import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext({ data: [], loading: true });

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // optional

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3000/people')
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err); // optional
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);

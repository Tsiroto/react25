import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext({ data: [], loading: true });

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // optional

    const fetchData = async () => {
        try {
            const res = await fetch('https://giorgosn8.sg-host.com/api/users.php')
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err);
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, error, fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);

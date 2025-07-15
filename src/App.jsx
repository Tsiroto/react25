import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Reports from './components/dashboard/Reports.jsx';
import PeopleTable from './components/dashboard/People.jsx';
import { DataProvider } from './data/DataContext';
import DashboardContent from "./components/dashboard/DashboardContent.jsx";

function App() {
    return (
        <DataProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<DashboardContent />}>
                        <Route index element={<Reports />} />
                        <Route path="report" element={<Reports />} />
                        <Route path="people" element={<PeopleTable />} />
                    </Route>
                </Route>
            </Routes>
        </DataProvider>
    );
}

export default App;

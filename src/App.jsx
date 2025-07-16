import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Reports from './components/layout/dashboard/Reports.jsx';
import People from './components/layout/dashboard/People.jsx';
import { DataProvider } from './data/DataContext';
import DashboardContent from "./components/layout/dashboard/DashboardContent.jsx";
import ReadMe from "./components/layout/dashboard/ReadMe.jsx";

function App() {
    return (
        <DataProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<DashboardContent />}>
                        <Route index element={<Reports />} />
                        <Route path="report" element={<Reports />} />
                        <Route path="people" element={<People />} />
                        <Route path="readme" element={<ReadMe />} />
                    </Route>
                </Route>
            </Routes>
        </DataProvider>
    );
}

export default App;

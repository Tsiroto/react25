import Layout from './components/layout/Layout';
import DashboardContent from './components/dashboard/DashboardContent';
import { DataProvider } from './data/DataContext.jsx';

function App() {
    return (
        <DataProvider>
            <Layout>
                <DashboardContent />
            </Layout>
        </DataProvider>
    );
}

export default App;

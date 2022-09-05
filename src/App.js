import './App.css';
import AppRoutes from "./routes/AppRoutes";
import AdminLayout from "./layout/adminLayout";
import { Route } from 'react-router-dom';

function App() {
    return (
        <AdminLayout class="wrapper">
            <AppRoutes/>
        </AdminLayout>

       
    );
}

export default App;

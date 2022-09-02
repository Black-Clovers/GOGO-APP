import './App.css';
import AppRoutes from "./routes/AppRoutes";
import AdminLayout from "./layout/adminLayout";

function App() {
    return (
        <AdminLayout class="wrapper">
            <div className="App">
                <AppRoutes/>
            </div>
        </AdminLayout>
    );
}

export default App;

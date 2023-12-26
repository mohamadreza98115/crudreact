import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import EmployeesList from "./Components/employee/EmployeesList.jsx";
import DepartmentsList from "./Components/Department/DepartmentsList.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import DepartmentDetail from "./Components/Department/DepartmentDetail.jsx";
import Dashborad from "./Components/Dashborad.jsx";
import EditEmployee from "./Components/employee/EditEmployee.jsx";

const client = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashborad/>
            },
            {
                path: "/employees",
                element: <EmployeesList/>,
            },
            {
                path: "/employees/:employeeId",
                element: <EditEmployee/>
            },
            {
                path: "/departments",
                element: <DepartmentsList/>
            },
            {
                path: "/departments/:departmentId",
                element: <DepartmentDetail/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)

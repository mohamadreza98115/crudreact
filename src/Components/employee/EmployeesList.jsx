import AddNewEmployee from "./AddNewEmployee.jsx";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";


const fetchAllEmployees = async () => {
    return axios.get("http://localhost:8080/api/employee").then(res => res.data);
}

const EmployeesList = () => {
    const {data, isLoading} = useQuery({queryKey: ["fetch employees"], queryFn: fetchAllEmployees})
    // eslint-disable-next-line no-unused-vars
    const employees = [{
        id: 1,
        firstname: "Ahmad",
        lastname: "ahmadi",
        email: "ahmad@gmail.com",
    }];
    console.log(isLoading)
    // if (isLoading) return <h5 className={"p-4 text-blue-600"}>Loading...</h5>
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Employees</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the employees in your system including their ID, Firstname,Lastname and email.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <AddNewEmployee/>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    ID
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    First Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Last Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {employees?.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className="text-gray-900">{employee.id}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className={'text-gray-900'}>{employee.firstname}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{employee.lastname}</td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{employee.email}</td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href={`/employees/${employee.id}`}
                                           className="text-indigo-600 hover:text-indigo-900">
                                            Edit<span className="sr-only">, {employee.name}</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesList;
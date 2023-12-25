import AddNewDepartment from "./AddNewDepartment.jsx";

const DepartmentsList = () => {
    const departments = [{
        name: "Computers",
        description: "sldkjfklsdjfklsdjfkljsdlkfjsdlkjf",
        price: 1100,
        brand: "Apple",
    }];
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Employees</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the employees in your system including their name, ID, address and age.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <AddNewDepartment/>
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
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Brand
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {departments?.map((product) => (
                                <tr key={product.id}>
                                    <td className="whitespace-nowrap py-5 pl-3 pr-3 text-sm sm:pl-0">
                                        <div className="flex items-center">
                                            <div className="h-11 w-11 flex-shrink-0">
                                                <img
                                                    className="rounded-full h-11 w-11"
                                                    src={product.thumbnail}
                                                    alt="img"/>
                                            </div>
                                            <div className="ml-4">
                                                <div
                                                    className="font-medium text-gray-900">{product.name.substring(0, 15)}-
                                                </div>
                                                <div className="mt-1 text-gray-500">Rating: {product.rating}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className="text-gray-900">{product.description.substring(0, 30)}...</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className={'text-gray-900'}>${product.price}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{product.brand?.substring(0, 10)}</td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href={`/employees/${product.id}`}
                                           className="text-indigo-600 hover:text-indigo-900">
                                            Edit<span className="sr-only">, {product.name}</span>
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

export default DepartmentsList;
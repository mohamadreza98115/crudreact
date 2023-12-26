import {useParams} from "react-router-dom";
import SuccessAlert from "../SuccessAlert.jsx";
import DeleteEmployee from "../employee/DeleteEmployee.jsx";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'

const fetchDepartmentById = () => {
    return axios.get("http://localhost:8080/api/department").then(res => res.data);
}

const schema = z.object({
    name: z.string().min(3)
})

const DepartmentDetail = () => {
    const {departmentId} = useParams();
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const {data, isLoading} = useQuery({
        queryFn: () => fetchDepartmentById(departmentId),
        queryKey: ['fetch-departments', departmentId]
    })
    const mutation = useMutation({
        mutationFn: (data) => {
            return axios.post("http://localhost:8080/api/department", data);
        }
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: data
    });

    const onSubmit = (values) => {
        console.log(values)
        mutation.mutate(values);
    }

    console.log(isLoading)

    return (
        <div>
            <SuccessAlert show={show} setShow={setShow}/>
            <div className="xl:pl-72">
                <main>
                    <div className="divide-y divide-white/5">
                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7">Department
                                    Information</h2>
                            </div>

                            <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                                    <div className="col-span-full">
                                        <label htmlFor="name"
                                               className="block text-sm font-medium leading-6">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("name")}
                                                id="name"
                                                type="text"
                                                className="block w-full px-2 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-black focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.name &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.name.message}
                                            </p>}
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7">Delete Department</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    No longer want to use this department? You can delete department here. This action
                                    is not reversible.
                                    All information related to this department will be deleted permanently.
                                </p>
                            </div>

                            <div className="flex items-start md:col-span-2">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                >
                                    Yes, delete department
                                </button>
                                <DeleteEmployee id={data?.data?.id} open={open} setOpen={setOpen}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DepartmentDetail;
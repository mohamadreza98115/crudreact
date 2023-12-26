import DeleteEmployee from "./DeleteEmployee.jsx";
import SuccessAlert from "../SuccessAlert.jsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

const schema = z.object({
//     Schema validation with zod
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email()
})

const fetchEmployeeById = (id) => {
    return axios.get(`http://localhost:8080/api/employee/${id}`).then(res => res.data);
}


const EditEmployee = () => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const {employeeId} = useParams();
    const {data, isLoading} = useQuery({
        queryFn: () => fetchEmployeeById(employeeId),
        queryKey: ['fetchemployee', employeeId]
    })
    const mutation = useMutation({
        mutationFn: (data) => {
            return axios.post("http://localhost:8080/api/employee", data);
        }
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: data
    });

    const onSubmit = (values) => {
        console.log(values);
        mutation.mutate(values);

    }
    console.log(isLoading);
    if (mutation.isLoading) {
        return <h5 className={'p-4'}>Adding Employee...</h5>
    }
    return (
        <div>
            <SuccessAlert show={show} setShow={setShow}/>
            <div className="xl:pl-72">
                <main>
                    <div className="divide-y divide-white/5">
                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7">Employee
                                    Information</h2>
                            </div>

                            <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                                    <div className="col-span-full">
                                        <label htmlFor="fName"
                                               className="block text-sm font-medium leading-6">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("firstname")}
                                                id="fName"
                                                type="text"
                                                className="block w-full px-2 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-black focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.firstname &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.firstname.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="lName"
                                               className="block text-sm font-medium leading-6">
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("lastname")}
                                                id="lName"
                                                type="text"
                                                className="block w-full rounded-md px-2 py-1.5 shadow-sm ring-1 ring-inset ring-black focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.lastname &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.lastname.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("email",)}
                                                id="email"
                                                type="email"
                                                className="block w-full rounded-md px-2 py-1.5 shadow-sm ring-1 ring-inset ring-black focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.email.message}
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
                                <h2 className="text-base font-semibold leading-7">Delete employee</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    No longer want to use this employee? You can delete employee here. This action
                                    is not reversible.
                                    All information related to this employee will be deleted permanently.
                                </p>
                            </div>

                            <div className="flex items-start md:col-span-2">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                >
                                    Yes, delete employee
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

export default EditEmployee;
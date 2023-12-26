import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationCircleIcon, PlusIcon} from "@heroicons/react/20/solid";
import {Controller, useForm} from "react-hook-form";
import className from "clsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'
import SuccessAlert from "../SuccessAlert.jsx";
import {input_error_classes} from "../constants.js";
import axios from "axios";


const schema = z.object({
    fName: z.string().min(3, "firstName must contain at least 3 character(s)"),
    lName: z.string().min(3, "lastName must contain at least 3 character(s)"),
    email: z.string().email(),
})

export default function AddNewEmployee() {
    const [open, setOpen] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(schema),
    });

    const cancelButtonRef = useRef(null)

    const onSubmit = async (values) => {
        console.log(values);
        //     Call backend api
        axios.post("http://localhost:8080/api/employee", values).then(res => {
            setAlert(true);
            return res.data;
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <SuccessAlert show={showAlert} setShow={setAlert}/>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add product
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="mt-10 fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                <PlusIcon className="h-6 w-6 " aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Add Employee
                                                </Dialog.Title>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="mt-2">
                                                        <Controller control={control} name={"fName"}
                                                                    render={({field}) => <div>
                                                                        <label htmlFor="fName"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            First Name
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                type="text"
                                                                                {...field}
                                                                                id="fName"
                                                                                className={className(`block w-full min-w-[20rem] px-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.fName && input_error_classes)}
                                                                            />
                                                                            {errors.fName && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.fName &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.fName.message}
                                                                            </p>}
                                                                    </div>}
                                                        />

                                                        <Controller control={control} name={"lName"}
                                                                    render={({field}) => <div>
                                                                        <label htmlFor="lName"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Last Name
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                type="text"
                                                                                {...field}
                                                                                id="lName"
                                                                                className={className(`block w-full min-w-[20rem] px-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.lName && input_error_classes)}
                                                                            />
                                                                            {errors.lName && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.lName &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.lName.message}
                                                                            </p>}
                                                                    </div>}
                                                        />

                                                        <Controller control={control} name={"email"}
                                                                    render={({field}) => <div>
                                                                        <label htmlFor="email"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Email
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                type="text"
                                                                                {...field}
                                                                                id="email"
                                                                                className={className(`block w-full min-w-[20rem] px-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.email && input_error_classes)}
                                                                            />
                                                                            {errors.email && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.email &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.email.message}
                                                                            </p>}
                                                                    </div>}
                                                        />

                                                    </div>


                                                    <div
                                                        className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                                        <button
                                                            type="submit"
                                                            className="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"

                                                            // disabled={!isValid}
                                                        >
                                                            Add
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

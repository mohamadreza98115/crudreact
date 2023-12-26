import {HomeIcon, UserGroupIcon, FolderIcon} from "@heroicons/react/16/solid/index.js";

export const navigation = [
    {name: 'Dashboard', href: '/dashboard', icon: HomeIcon},
    {name: 'Employees', href: '/employees', icon: UserGroupIcon},
    {name: 'Departments', href: '/departments', icon: FolderIcon},
]

export const profileMenu = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

export const input_error_classes = "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"

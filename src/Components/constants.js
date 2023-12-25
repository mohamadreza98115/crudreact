import {HomeIcon, UserGroupIcon, FolderIcon} from "@heroicons/react/16/solid/index.js";

export const navigation = [
    {name: 'Dashboard', href: '/', icon: HomeIcon},
    {name: 'Employees', href: '/employees', icon: UserGroupIcon},
    {name: 'Departments', href: '/departments', icon: FolderIcon},
]

export const profileMenu = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]
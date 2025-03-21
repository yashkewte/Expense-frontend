import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from 'react-icons/lu'

export const SIDE_MENU_DATA = [
    {
        id: 1,
        lable:'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard',
    },
    {
        id: 2,
        lable:'Income',
        icon: LuWalletMinimal,
        path: '/income',
    },
    {
        id: 3,
        lable: 'Expense',
        icon: LuHandCoins,
        path: '/expense',
    },
    {
        id: 4,
        lable: 'Logout',
        icon: LuLogOut,
        path: '/logout',
    }
]
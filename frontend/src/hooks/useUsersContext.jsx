import { UsersContext } from "../context/UsersContext"; 
import { useContext } from "react";

export const useUsersContext = () => {
    const context = useContext(UsersContext)

    return context
}
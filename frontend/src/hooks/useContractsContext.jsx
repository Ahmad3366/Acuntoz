import { ContractsContext } from "../context/ContractsContext";
import { useContext } from "react";

export const useContractsContext = () => {
    const context = useContext(ContractsContext)

    return context
}
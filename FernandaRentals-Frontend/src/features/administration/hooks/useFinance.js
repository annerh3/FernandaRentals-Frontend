import { useState } from "react";
import { getFinancialsMonthly } from "../../../shared/actions/Admin/finance.actions";

export const useFinance = () => {
    // Funcion para cargar el Dashboard
    const [finance, setFinance] = useState({});
    const [financeIsLoading, setFinanceIsLoading] = useState(false);

const loadFinancialsMonthly = async (values) => {
    setFinanceIsLoading(true);
    try
    {
        const result = await getFinancialsMonthly(values);
        setFinance(result) 
    } catch (error) {
        console.error(error);
      } finally {
        setFinanceIsLoading(false);
      }
}

    return{
        finance,
        financeIsLoading,
        loadFinancialsMonthly,
    }
}
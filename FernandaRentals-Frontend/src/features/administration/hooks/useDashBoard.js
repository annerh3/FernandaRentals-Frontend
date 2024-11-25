import { useState } from "react";
import { getDashBoardData } from "../../../shared/actions/Admin/dashboard.actions";

export const useDashBoard = () => {
    const [dashboard, setDashBoard] = useState({});
    const [isLoading, setIsLoading] = useState(false);

const loadDashBoardData = async () => {
    setIsLoading(true);
    try
    {
        const result = await getDashBoardData();
        setDashBoard(result) 
    } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
}

    return{
        dashboard,
        isLoading,
        loadDashBoardData,
    }
}
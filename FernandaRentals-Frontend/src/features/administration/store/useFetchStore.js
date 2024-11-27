import { create } from "zustand";

export const useFetchStore = create((set) => ({
    fetch : false,
    setFetch:  (bool) => {       
        set({ fetch: bool});
    },  
    
}));
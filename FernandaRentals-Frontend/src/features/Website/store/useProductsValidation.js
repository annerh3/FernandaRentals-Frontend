import { create } from "zustand";

export const useProductsValidation = create((set) => ({
    showModal : false,
    setShowModal:  (bool) => {       
        set({ showModal: bool});
    }, 

    data: [{
        "product": {
				"description": "",
				"urlImage": "",
				"categoryId": "",
				"stock": 0,
				"price": 0,
				"id": "",
				"name": "",
				"createdDate": "",
				"updatedBy": "",
				"updatedDate": ""
			},
		"unavailableDate": "2000-01-01T00:00:00"
    }],
    setData: (dt) => {
        set({data:dt})
    },

    success: false,
    setSuccess:  (bool) => {       
        set({ success: bool});
    }, 


    // reset: () => {
    //     set({
    //         showModal : false, 
    //         data: [{
    //             "product": {
    //                     "description": "",
    //                     "urlImage": "",
    //                     "categoryId": "",
    //                     "stock": 0,
    //                     "price": 0,
    //                     "id": "",
    //                     "name": "",
    //                     "createdDate": "",
    //                     "updatedBy": "",
    //                     "updatedDate": ""
    //                 },
    //             "unavailableDate": "2000-01-01T00:00:00"
    //          }],
    //          success: false,
    //          eventStartDate: "2000-01-01T00:00:00",
    //          eventEndDate: "2000-01-01T00:00:00",
    //         })
    // },
}));

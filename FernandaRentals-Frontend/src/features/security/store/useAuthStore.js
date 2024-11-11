import { create } from "zustand";
import { loginAsync } from "../../../shared/actions/auth/auth.action";

export const useAuthStore = create((set, get) => ({
    // Propiedades de estados iniciales
    user : null, 
    token: null,
    //refreshToken: null,
    isAuthenticated: false,
    message: 'gogo',
    error: false,

    // Método de login para autenticar al usuario
    login: async (form) => {
        const {status, data, message} = await loginAsync(form);

        console.log(status)
        if(status){
            set(
                {
                    error: false,
                    user: {
                        name: data.name,
                        email: data.email,
                        tokenExpiration: data.tokenExpiration
                    },
                    token: data.token,
                    isAuthenticated: true,
                    message: message
                }
            );
            localStorage.setItem('user', JSON.stringify(get().user ?? {}))
            localStorage.setItem('token', get().token);
            return { error: false, message };
        }
        set({message: message, error: true});
        return { error: true, message };
    },


    // Método de logout para cerrar sesión
    logout: () => {
        set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: false, 
            message: ''
            })
        localStorage.clear()
    }
}));
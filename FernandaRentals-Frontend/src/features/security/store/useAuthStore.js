import { create } from "zustand";
import { loginAsync, registerAsync } from "../../../shared/actions/auth/auth.action";
import { jwtDecode } from "jwt-decode";
import { register } from "react-scroll/modules/mixins/scroller";
export const useAuthStore = create((set, get) => ({
    // Propiedades de estados iniciales
    user: null,
    token: null,
    roles: [],
    refreshToken: null,
    isAuthenticated: false,
    message: 'el-gogo',
    error: false,

    // Método de login para autenticar al usuario
    login: async (form) => {
        const { status, data, message } = await loginAsync(form);

        console.log(status)
        if (status) {
            set(
                {
                    error: false,
                    user: {
                        name: data.name,
                        email: data.email,
                        tokenExpiration: data.tokenExpiration,
                        clientType : data.clientType,
                    },
                    token: data.token,
                    refreshToken: data.refreshToken,
                    isAuthenticated: true,
                    message: message
                }
            );
            localStorage.setItem('user', JSON.stringify(get().user ?? {}))
            localStorage.setItem('token', get().token);
            localStorage.setItem('refreshToken', get().refreshToken)
            return { error: false, message };
        }
        set({ message: message, error: true });
        return { error: true, message };
    },

    register: async (form) => {
        const { status, data, message } = await registerAsync(form);
        if (status) {
            set(
                {
                    error: false,
                    user: {
                        name: data.name,
                        email: data.email,
                        tokenExpiration: data.tokenExpiration,
                        clientType : data.clientType,
                    },
                    token: data.token,
                    refreshToken: data.refreshToken,
                    isAuthenticated: true,
                    message: message
                }
            );
            localStorage.setItem('user', JSON.stringify(get().user ?? {}))
            localStorage.setItem('token', get().token);
            localStorage.setItem('refreshToken', get().refreshToken)
            return { error: false, message };
        }
        set({ message: message, error: true });
        return { error: true, message };
    },
    setSession: (user, token, refreshToken) => {
        set(
            {
                user: user,
                token: token,
                refreshToken: refreshToken,
                isAuthenticated: true
            }
        );

        localStorage.setItem('user', JSON.stringify(get().user ?? {}))
        localStorage.setItem('token', get().token)
        localStorage.setItem('refreshToken', get().refreshToken)
    },

    // Método de logout para cerrar sesión
    logout: () => {
        set({
            user: null,
            token: null,
            roles: [],
            refreshToken: null,
            isAuthenticated: false,
            error: false,
            message: ''
        })
        localStorage.clear()
    },

    validateAuthentication: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token) {
            set({ isAuthenticated: false });
            return;
        }

        try {
            const decodeJwt = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // convertir fecha y hora actual en segundos

            if (decodeJwt.exp < currentTime) {
                console.log('Token Expirado');
                set({ isAuthenticated: false });
                return;
            }

            const roles = decodeJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            console.log("Roles en useAuthStore --> ",roles);


            set(
            { 
                isAuthenticated: true, 
                roles: typeof (roles) === 'string' ? [roles] : roles,
                user: typeof(user) === "string" ? JSON.parse(user) : user });
 
        } catch (error) {
            console.error(error);
            set({ isAuthenticated: false })
        }
    }
}));
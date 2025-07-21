import { useCallback, useEffect, useMemo, useState } from "react";
import constate from "constate";
import httpClient from "../components/httpClient/httpClient";

export const [ContextProvider, useAuthentication] = constate(
    useLogin,
    value => value.authMethods
);

function useLogin() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token_key") !== null)
    const [currentUser, setCurrentUser] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("token_key") !== null)
        if (!isAuthenticated) {
            // window.location.href = "/"
        } else {
            if (!currentUser) {
                const getCurrentUserAsync = async () => {
                    await getCurrentUser()
                }
                getCurrentUserAsync()
            }
        }
    }, [currentUser, isAuthenticated]);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token_key")
            if (token) {
                const response = await httpClient.get(`users/user-info`)
                setCurrentUser(response.data)
                if(response.data.roles.includes("ADMIN")) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } else {
                setCurrentUser("")
                window.location.href = "/"
            }
        } catch (error) {
            setCurrentUser("")
            window.location.href = "/"
        }
    }

    const ensureLogin = useCallback(async () => {
        if (localStorage.getItem("token_key") === null) {
            window.location.href = "/"
        } else {
            await getCurrentUser()
        }
    }, []);

    const clearLocalStorage = () => {
        localStorage.removeItem("token_key")
    };

    const onLogout = () => {
        clearLocalStorage();
    };

    const authMethods = useMemo(
        () => ({
            ensureLogin,
            clearLocalStorage,
            onLogout,
            getCurrentUser,
            currentUser,
            isAdmin
        }),
        [
            ensureLogin,
            clearLocalStorage,
            onLogout,
            getCurrentUser,
            currentUser,
            isAdmin
        ]
    );

    return { authMethods };
}


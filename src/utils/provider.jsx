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
        const token = localStorage.getItem("token_key")
        if (token) {
            const response = await httpClient.get(`users/user-info`)
            setCurrentUser(response.data)
        } else {
            setCurrentUser("")
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
            currentUser
        }),
        [
            ensureLogin,
            clearLocalStorage,
            onLogout,
            getCurrentUser,
            currentUser
        ]
    );

    return { authMethods };
}


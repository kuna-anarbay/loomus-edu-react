import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LocalStorageKey, useLocalStorage } from "../hooks/use-local-storage";
import { useLogin, useLogout } from "../../auth/hooks/auth-hooks";
import TokenData from "../../auth/models/TokenData";
import { useGetMe } from "../../user/hooks/user-hooks";
import User from "../../user/models/User";
import ToastView from "../views/utility/toast-view";
import { ValidatorContextOptions, ValidatorProvider } from "react-class-validator";
import { useTranslation } from "react-i18next";
import NextNProgress from "nextjs-progressbar";
import config from "../../../config";
import DeviceUtils from "../../../utils/device-utils";

type AppDataType = {

    // User related
    currentUser: User | null;
    logout: (completion?: () => void) => void;
    onLogin: (user: User, completion?: () => void) => void;
    setUser: (user: User) => void;

    // Common
    toastError: (err: string | Error | any) => void;
    toastSuccess: (message: string) => void;
}

const AppData = createContext<AppDataType>(undefined!);

export function AppDataProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const { t } = useTranslation();
    const { push, query } = useRouter();
    const { phone, password } = query;
    const { mutate: login } = useLogin();
    const { mutate: logoutUser } = useLogout();
    const { mutate: getMe } = useGetMe();
    const { get, set } = useLocalStorage();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        configureUserData();
    }, [])

    const showError = (err: string | Error | any) => {
        const message = err instanceof Error ? err.message : err;
        toast({
            status: "error",
            isClosable: true,
            position: "top",
            duration: 3000,
            render: ({ onClose }) => (
                <ToastView isError={true} bgColor={"highlight.red.base"} message={message} onClose={onClose}/>
            )
        });
    }

    const onLogin = (user: User, completion?: (() => void)) => {
        set(LocalStorageKey.CURRENT_USER, user);
        setUser(user);
        if (completion) {
            completion();
        }
    }

    const showSuccess = (message: string) => {
        toast({
            status: "success",
            isClosable: true,
            position: "top",
            duration: 3000,
            render: ({ onClose }) => (
                <ToastView isError={false} bgColor={"highlight.green.base"} message={message} onClose={onClose}/>
            )
        });
    }

    const logout = (completion: (() => void) | undefined) => {
        logoutUser(null, {
            onSuccess: () => {
                set(LocalStorageKey.CURRENT_USER, null);
                setUser(null);
                if (completion) {
                    completion();
                }
                push("/");
            },
            onError: () => {
                set(LocalStorageKey.CURRENT_USER, null);
                setUser(null);
                if (completion) {
                    completion();
                }
                push("/");
            }
        })
    }

    const configureUserData = () => {
        setUser(get<User>(LocalStorageKey.CURRENT_USER));
        if (get<TokenData>(LocalStorageKey.TOKEN_DATA)) {
            getMe(undefined, {
                onSuccess: (user) => {
                    setUser(user);
                    set(LocalStorageKey.CURRENT_USER, user);
                },
                onError: error => showError(error)
            });
        } else if (phone && password) {
            login({
                version: config.version,
                password: password as string,
                deviceType: DeviceUtils.deviceName(),
                os: DeviceUtils.deviceVersion(),
                phone: phone as string,
                platform: "DESKTOP"
            }, {
                onSuccess: (user) => {
                    setUser(user);
                    set(LocalStorageKey.CURRENT_USER, user);
                },
                onError: error => showError(error)
            })
        }
    }

    const validatorOptions: ValidatorContextOptions = {
        onErrorMessage: (error): string[] => {
            let errorMessage = "";
            if (error.constraints) {
                errorMessage = error.constraints[Object.keys(error.constraints)[0]];
                showError(t(errorMessage));
            }

            return [errorMessage];
        },
        resultType: "boolean"
    }

    return (
        <div>
            <NextNProgress
                color={"#128C7E"}
                height={3}
                showOnShallow={true}
                nonce={undefined}
                options={{
                    showSpinner: false
                }}
                startPosition={0.3}
                stopDelayMs={200}
            />
            <ValidatorProvider options={validatorOptions}>
                <AppData.Provider
                    value={{
                        currentUser: user,
                        logout: logout,
                        onLogin: onLogin,

                        setUser: (user) => setUser(user),

                        toastError: showError,
                        toastSuccess: showSuccess
                    }}
                >

                    {children}
                </AppData.Provider>
            </ValidatorProvider>
        </div>
    )

}

export const useAppData = () => useContext(AppData);
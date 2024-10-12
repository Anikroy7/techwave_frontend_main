import { useMutation } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form";
import { loginUser, signupUser, updateUser } from "../services/authService";
import { toast } from "sonner";

export const useSignupUser = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_SIGNUP"],
        mutationFn: async (userData) => await signupUser(userData),
        onSuccess: (data) => {
            if (data) {
                if (data.success) {
                    toast.success(data.message);
                }
                if (!data.success) {
                    data.errorSources.map((e: { message: string }, index: number) => toast.error(e.message, { id: `error-${index}` }))
                }
            } else {
                toast.error("Something went wrong")
            }
        },
        onError: (error) => {
            // console.log(error)
            toast.error(error.message);
        },
    });
}

export const useUpdateUser = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_UPDATE"],
        mutationFn: async (userData) => await updateUser(userData),
        onSuccess: (data) => {
            if (data) {
                console.log('hook data', data)
                if (data.success) {
                    toast.success(data.message);
                }
                if (!data.success) {
                    data.errorSources.map((e: { message: string }, index: number) => toast.error(e.message, { id: `error-${index}` }))
                }
            } else {
                toast.error("Something went wrong")
            }
        },
        onError: (error) => {
            // console.log(error)
            toast.error(error.message);
        },
    });
}

export const useLoginUser = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await loginUser(userData),
        onSuccess: (data) => {
            if (data) {
                if (data.success) {
                    toast.success(data.message);
                }
                if (!data.success) {
                    data.errorSources.map((e: { message: string }, index: number) => toast.error(e.message, { id: `error-${index}` }))
                }
            } else {
                toast.error("Something went wrong")
            }
        },
        onError: (error) => {
            // console.log(error)
            toast.error(error.message);
        },
    });
}
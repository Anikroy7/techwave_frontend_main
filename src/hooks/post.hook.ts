import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createPost } from "../services/postService";

export const useCreatePost = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (userData) => await createPost(userData),
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
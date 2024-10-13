import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createPost, getMyposts, updatePostVote } from "../services/postService";

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
export const useGetMyposts = (userData: { userId: string }) => {
    return useQuery({
        queryKey: ["GET_MY_POSTS"],
        queryFn: async () => await getMyposts(userData),
    });

}

export const useUpdatePostVote = () => {
    return useMutation<any, Error, { postId: string; voteType: string; votes: string[] }>({
        mutationKey: ["CREATE_POST_VOTE"],
        mutationFn: async ({ postId, voteType, votes }) => await updatePostVote(postId, voteType, votes),
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
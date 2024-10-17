import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyInfo, updateFollowers } from "../services/userService";
import { toast } from "sonner";
import { queryClient } from "../lib/Providers";

export const useUpdateFollowers = () => {
    return useMutation<
        any,
        Error,
        { followData: { userId: string; followingId: string; type: "add" | "delete"; } }
    >({
        mutationKey: ["UPDATE_FOLLWERS"],

        mutationFn: async ({ followData }) =>
            await updateFollowers(followData),
        onSuccess: (data) => {
            if (data) {
                if (data.success) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] })
                    queryClient.invalidateQueries({ queryKey: ['GET_MY_POSTS'] })
                    queryClient.invalidateQueries({ queryKey: ['GET_MY_INFO'] })
                }
                if (!data.success) {
                    data.errorSources.map((e: { message: string }, index: number) =>
                        toast.error(e.message, { id: `error-${index}` }),
                    );
                }
            } else {
                toast.error("Something went wrong");
            }
        },
        onError: (error) => {
            // console.log(error)
            toast.error(error.message);
        },
    });
};

export const userGetMyInfo = () => {
    return useQuery({
        queryKey: ["GET_MY_INFO"],
        queryFn: async () => await getMyInfo(),
    });
}
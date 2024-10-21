import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  getAllUsers,
  getMyInfo,
  updateFollowers,
} from "../services/userService";
import { queryClient } from "../lib/Providers";
import { updateSingleUser } from "../services/authService";

export const useUpdateFollowers = () => {
  return useMutation<
    any,
    Error,
    {
      followData: {
        userId: string;
        followingId: string;
        type: "add" | "delete";
      };
    }
  >({
    mutationKey: ["UPDATE_FOLLWERS"],

    mutationFn: async ({ followData }) => await updateFollowers(followData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_POSTS"] });
          queryClient.invalidateQueries({ queryKey: ["GET_MY_POSTS"] });
          queryClient.invalidateQueries({ queryKey: ["GET_MY_INFO"] });
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

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["GET_MY_INFO"],
    queryFn: async () => await getMyInfo(),
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useUpdateSingleUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_SINGLE_USER"],

    mutationFn: async ({ userData, userId }) =>
      await updateSingleUser(userId, userData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["GET_MY_INFO"] });
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
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

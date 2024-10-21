import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createOrder,
  getAllOrders,
  getMyOrder,
  getSingleOrder,
  updateOrder,
} from "../services/orderService";
import { queryClient } from "../lib/Providers";

export const useCreateOrder = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (orderData) => await createOrder(orderData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
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
      toast.error(error.message);
    },
  });
};

export const useGetMyOrder = () => {
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["GET_MY_ORDER"],

    mutationFn: async ({ userId }) => await getMyOrder({ userId }),

    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
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

export const useGetSingleOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_ORDER"],
    queryFn: async () => await getSingleOrder(orderId),
  });
};
export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["GET_ALL_ORDERS"],
    queryFn: async () => await getAllOrders(),
  });
};


export const useUpdateOrder = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_ORDER"],

    mutationFn: async ({ orderId, orderData }) =>
      await updateOrder(orderId, orderData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_ORDERS"] });
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
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createOrder, getMyOrder } from "../services/orderService";
import { toast } from "sonner";

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
    return useMutation<
        any,
        Error,
        { userId: string; }
    >({
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
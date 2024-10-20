import React from "react";

import { useUser } from "@/src/context/user.provider";
import { useGetSingleOrder } from "@/src/hooks/order.hook";

const PaymentDetails = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <p />;
  const { data, isPending } = useGetSingleOrder(user?.userId as string);

  console.log(data, isPending);

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      {
        <div className=" p-4 rounded-lg">
          <div className="mb-4">
            <span className="font-semibold">User Name:</span>
            <span className="block ">{data?.data?.user.name}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Payment Status:</span>
            <span
              className={`block ${data?.data?.paymentStatus === "Paid" ? "text-green-500" : data?.data?.paymentStatus === "Failed" ? "text-red-500" : "text-yellow-500"}`}
            >
              {data?.data?.paymentStatus}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Transaction ID:</span>
            <span className="block ">{data?.data?.transactionId}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Total Price:</span>
            <span className="block ">${data?.data?.totalPrice.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Start Date:</span>
            <span className="block ">
              {new Date(data?.data?.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">End Date:</span>
            <span className="block ">
              {new Date(data?.data?.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      }
    </div>
  );
};

export default PaymentDetails;

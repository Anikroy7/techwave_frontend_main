// components/OrderTable.tsx
import React from "react";

import { TOrder } from "@/src/types";

const OrderTable = ({ orders }: { orders: TOrder[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">User ID</th>
            <th className="py-3 px-6 text-left">Payment Status</th>
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">Total Price</th>
            <th className="py-3 px-6 text-left">Start Date</th>
            <th className="py-3 px-6 text-left">End Date</th>
          </tr>
        </thead>
        <tbody className=" text-sm font-light">
          {orders.map((order) => (
            <tr key={order.transactionId} className="border-b border-gray-300 ">
              <td className="py-3 px-6">{order.user.toString()}</td>
              <td
                className={`py-3 px-6 font-semibold ${order.paymentStatus === "Paid" ? "text-green-500" : order.paymentStatus === "Failed" ? "text-red-500" : "text-yellow-500"}`}
              >
                {order.paymentStatus}
              </td>
              <td className="py-3 px-6">{order.transactionId}</td>
              <td className="py-3 px-6">${order.totalPrice.toFixed(2)}</td>
              <td className="py-3 px-6">
                {new Date(order.startDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                {new Date(order.endDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

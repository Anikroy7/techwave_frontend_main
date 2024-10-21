// components/OrderTable.tsx
import React from "react";

import { TOrder } from "@/src/types";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { VerticalDotsIcon } from "@/src/assets/icons";
import { useUpdateOrder } from "@/src/hooks/order.hook";

const statusColorMap: {
  Paid: "success";
  Failed: "danger";
  Pending: "warning";
} = {
  Paid: "success",
  Failed: "danger",
  Pending: "warning",
};

const OrderTable = ({ orders }: { orders: TOrder[] }) => {


  const { mutate: handleUpdateOrder } = useUpdateOrder()

  const handleChangePaymentStatus = (id: string, status: string, userId: string) => {
    handleUpdateOrder({ orderData: { paymentStatus: status, user: userId }, orderId: id })
  }

  return (
    <div className="overflow-x-auto">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>TRANSICTION ID</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>START DATE</TableColumn>
          <TableColumn>END DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.transactionId} >
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.transactionId}</TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(order.endDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={statusColorMap[order.paymentStatus]}
                  size="sm"
                  variant="dot"
                >
                  {order.paymentStatus}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                  <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger>
                      <Button isIconOnly radius="full" size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-400" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleChangePaymentStatus(order._id, 'Paid', order?.user._id)} color="success">Paid</DropdownItem>
                      <DropdownItem onClick={() => handleChangePaymentStatus(order._id, 'Pending', order?.user._id)} color="warning">Pending</DropdownItem>
                      <DropdownItem onClick={() => handleChangePaymentStatus(order._id, 'Failed', order?.user._id)} color="danger">Cancel</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;

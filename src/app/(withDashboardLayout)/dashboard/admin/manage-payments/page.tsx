"use client"


import OrderTable from '@/src/components/dashboard/admin/OrdersTable';
import Loading from '@/src/components/UI/Loading';
import { useGetAllOrders } from '@/src/hooks/order.hook';
import React from 'react';


const OrdersPage = () => {
    const { data, isPending } = useGetAllOrders();
    if(isPending)return <></>
console.log(data?.data)
    return (
        <>
            {isPending && <Loading />
            }
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Orders List</h1>
                <OrderTable orders={data?.data} />
            </div>
        </>
    );
};

export default OrdersPage;

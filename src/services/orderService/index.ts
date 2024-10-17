"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createOrder = async (orderData: FieldValues) => {
    // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
    const url = `http://localhost:5000/api/orders`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(orderData),
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};


export const getMyOrder = async (userInfo: { userId: string }) => {
    const url = `http://localhost:5000/api/orders/my-order`;
    const accessToken = cookies().get('accessToken');
    const refreshToken = cookies().get("refreshToken")
    console.log(userInfo)
    const dta = {
        userId:userInfo.userId
    }
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken?.value}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(dta)
        });
        const result = await res.json();
        console.log('orderresut ', result)
        if (result.data) {
            const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `Bearer ${refreshToken?.value}`,
                },
                body: JSON.stringify({}),
            });
            const refreshResponse = await res.json();
            console.log('refreshResponse', refreshResponse)
            if (refreshResponse?.data) {
                cookies().set("accessToken", refreshResponse?.data?.accessToken);
            }
        }
        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};
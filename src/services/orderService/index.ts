"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createOrder = async (orderData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `https://techwave-backend-six.vercel.app/api/orders`;

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

export const getSingleOrder = async (id: string) => {
  const res = await fetch(`https://techwave-backend-six.vercel.app/api/orders/my-order/${id}`);

  return await res.json();
};
export const getAllOrders = async () => {
  const res = await fetch(`https://techwave-backend-six.vercel.app/api/orders`);

  return await res.json();
};

export const getMyOrder = async (userInfo: { userId: string }) => {
  const url = `https://techwave-backend-six.vercel.app/api/orders/my-order`;
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  const data = {
    userId: userInfo.userId,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.data) {
      const res = await fetch("https://techwave-backend-six.vercel.app/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `Bearer ${refreshToken?.value}`,
        },
        body: JSON.stringify({}),
      });
      const refreshResponse = await res.json();

      if (refreshResponse?.data) {
        cookies().set("accessToken", refreshResponse?.data?.accessToken);
      }
    }

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

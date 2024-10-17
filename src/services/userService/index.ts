"use server";


import { cookies } from "next/headers";

export const updateFollowers = async (
    followData: {
        userId: string,
        followingId: string,
        type?: 'add' | 'delete',
    }
) => {

    const url = `https://techwave-backend-six.vercel.app/api/users/${followData.type}-followers`;
    delete followData.type
    const refreshToken = cookies().get("refreshToken");

    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(followData),
        });
        const result = await res.json();
        if (result.message) {
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
            // console.log('refreshResponse', refreshResponse)
        }
        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};


export const getMyInfo = async () => {
    // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
    const url = `https://techwave-backend-six.vercel.app/api/users/me`;
    const accessToken = cookies().get("accessToken")?.value;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};
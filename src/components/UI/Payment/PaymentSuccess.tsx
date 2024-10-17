"use client"

import { useGetMyOrder } from "@/src/hooks/order.hook";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import Loading from "../Loading";
import { useUser } from "@/src/context/user.provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function PaymentSuccess() {
    const { user, setIsLoading, isLoading } = useUser()
    const { mutate: handleGetOrder, isPending, data, isSuccess } = useGetMyOrder();
    const router = useRouter()
    useEffect(() => {
        if (!isPending && isSuccess) {
            router.push("/");
            setIsLoading(true)
        }
    }, [isPending, isSuccess]);
    const getOrder = () => {
        handleGetOrder({ userId: user?.userId as string });
    }
    console.log(data)
    return (
        <div className="flex justify-center items-center h-screen ">
            {isLoading && <Loading />}
            <Card className="w-full max-w-md p-6">
                <p className="text-center mb-4">
                    Congratulations!
                </p>
                <div className="text-center text-gray-700 mb-4">
                    You are now a verified user. To access premium blogs and videos, please
                    make a payment of <span className="font-semibold">$20/month</span>.
                </div>
                <Button
                    color="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => getOrder()}
                >
                    Go to Profile
                </Button>
            </Card>
        </div>
    );
}

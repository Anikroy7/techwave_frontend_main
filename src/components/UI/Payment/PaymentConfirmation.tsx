"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { addDays, lightFormat } from "date-fns";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loading from "../Loading";
import TWInput from "../form/TWInput";
import TWForm from "../form/TWForm";

import { useCreateOrder } from "@/src/hooks/order.hook";
import { useUser } from "@/src/context/user.provider";

const PaymentConfirmation = () => {
  const { user, isLoading, setIsLoading } = useUser();
  const lastDate = addDays(new Date(), 30);
  const endDate = lightFormat(new Date(lastDate), "yyyy-MM-dd");
  const startDate = lightFormat(new Date(), "yyyy-MM-dd");
  const router = useRouter();
  const {
    mutate: handleCreateOrder,
    data,
    isPending,
    isSuccess,
  } = useCreateOrder();
  const onSubmit = () => {
    const orderData = {
      user: user?.userId,
      totalPrice: 20,
      startDate,
      endDate,
    };

    handleCreateOrder(orderData);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push(data?.data);
      setIsLoading(true);
    }
  }, [isPending, isSuccess]);

  if (isLoading) return <p />;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {isLoading || (isPending && <Loading />)}
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          Payment Confirmation
        </h2>

        <p className="text-gray-500 text-center mb-6">
          To access premium blogs and videos, please confirm your payment of{" "}
          <strong>$20/month</strong>.
        </p>
        <TWForm
          defaultValues={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
          }}
          onSubmit={onSubmit}
        >
          <div className="my-3">
            <TWInput disabled={true} label="Name" name="name" type="text" />
          </div>
          <div className="my-3 w-full">
            <Input
              isDisabled
              className="w-full"
              defaultValue={user?.email}
              label="Email"
              type="email"
            />
          </div>
          <div className="my-3">
            <TWInput
              disabled={true}
              label="Address"
              name="address"
              type="address"
            />
          </div>
          <div className="my-3">
            <TWInput disabled={true} label="Phone" name="phone" type="text" />
          </div>
          <div className="my-3">
            <DateRangePicker
              isDisabled
              className="w-full"
              defaultValue={{
                start: parseDate(startDate),
                end: parseDate(endDate),
              }}
              label="Payment validity duration"
            />
          </div>
          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Pay now
          </Button>
        </TWForm>

        <div className="mt-8 text-sm text-gray-500">
          <p className="text-center">
            By clicking "Confirm Payment", you agree to our monthly recurring
            charge of $20 for premium access. You can cancel at any time in your
            account settings.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;

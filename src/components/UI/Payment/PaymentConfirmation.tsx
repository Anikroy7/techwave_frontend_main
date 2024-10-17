"use client"

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import TWForm from "../form/TWForm";
import TWInput from "../form/TWInput";
import { useUser } from "@/src/context/user.provider";
import Loading from "../Loading";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import paymentValidationSchema from "@/src/schemas/payment.schema";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { addDays, lightFormat } from "date-fns";
type FormInput = {
    email: string
}

const PaymentConfirmation = () => {
    const { user, isLoading } = useUser();
    const lastDate = addDays(new Date(), 30)
    const endDate = lightFormat(new Date(lastDate), 'yyyy-MM-dd')
    const startDate = lightFormat(new Date(), 'yyyy-MM-dd')
    console.log()
    const onSubmit = (data: FormInput) => {
        console.log(data)
    }

    if (isLoading) return <p></p>
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            {isLoading && <Loading />}
            <Card className="w-full max-w-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-center ">
                    Payment Confirmation
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    To access premium blogs and videos, please confirm your payment of <strong>$20/month</strong>.
                </p>
                <TWForm
                    defaultValues={{
                        name: user?.name,
                        email: user?.email,
                        phone: user?.phone,
                        address: user?.address,

                    }}
                    resolver={zodResolver(paymentValidationSchema)}
                    onSubmit={onSubmit}
                >
                    <div className="my-3">
                        <TWInput label="Name" name="name" type="text" />
                    </div>
                    <div className="my-3 w-full">
                        <Input
                            isDisabled
                            type="email"
                            label="Email"
                            defaultValue={user?.email}
                            className="w-full"
                        />
                    </div>
                    <div className="my-3">
                        <TWInput label="Address" name="address" type="address" />
                    </div>
                    <div className="my-3">
                        <TWInput label="Phone" name="phone" type="text" />
                    </div>
                    <div className="my-3">
                        <DateRangePicker
                            label="Payment validity duration"
                            isDisabled
                            defaultValue={{
                                start: parseDate(startDate),
                                end: parseDate(endDate),
                            }}
                            className="w-full"
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
                        By clicking "Confirm Payment", you agree to our monthly recurring charge of $20 for premium access.
                        You can cancel at any time in your account settings.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default PaymentConfirmation;

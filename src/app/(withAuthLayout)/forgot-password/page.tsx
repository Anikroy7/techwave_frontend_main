"use client";

import TWForm from "@/src/components/UI/form/TWForm";
import TWInput from "@/src/components/UI/form/TWInput";
import { useForgetPassword } from "@/src/hooks/auth.hook";
import { forgetPasswordValidationSchema } from "@/src/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    const { mutate: handleForgetPassword, data, isPending, isSuccess } = useForgetPassword();
    const router = useRouter()
    const onSubmit = (data: { email: string }) => {
        handleForgetPassword(data)
    }

    useEffect(() => {
        if (!isPending && isSuccess && data?.success) {
            router.push("/link-send-successfull");
        }
    }, [isPending, isSuccess]);

    return <section className="bg-gradient-to-r  flex items-center justify-center min-h-screen">

        <div id="forgot-password-form" className="w-[30%] mx-auto">
            <div className="flex justify-center mb-6">
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s"
                    alt="Reset Password Illustration"
                    className="object-cover"
                    width={200}
                    height={200}
                />
            </div>
            <h2 className=" font-bold text-center  mb-6">Forgot Password</h2>
            <TWForm
                resolver={zodResolver(forgetPasswordValidationSchema)}
                onSubmit={onSubmit}
            >
                <div className="my-3">
                    <TWInput label="Email" name="email" type="email" />
                </div>
                <Button
                    className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                    size="lg"
                    type="submit"
                >
                    Send link
                </Button>
            </TWForm>
            <p className="text-center text-gray-200 mt-6">
                Remember your password? <Link href="/login" className="text-purple-500 hover:underline" >Log In</Link>
            </p>
        </div>
    </section>
}
export default page;
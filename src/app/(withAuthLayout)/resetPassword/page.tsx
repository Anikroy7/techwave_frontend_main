"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { resetPasswordValidationSchema } from "@/src/schemas/login.schema";
import { useResetPassword } from "@/src/hooks/auth.hook";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";

const Page = () => {
  const router = useRouter();
  const query = useSearchParams();

  const email = query.get("email");
  const token = query.get("token");

  const {
    mutate: handleResetPassword,
    data,
    isSuccess,
    isPending,
  } = useResetPassword();

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    handleResetPassword({
      email,
      token,
      password: data.password,
    });
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push("/login");
    }
  }, [isPending, isSuccess]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="bg-gradient-to-r flex items-center justify-center min-h-screen">
        <div className="w-[30%] mx-auto" id="forgotPassword-form">
          <div className="flex justify-center mb-6">
            <Image
              alt="Reset Password Illustration"
              className="object-cover"
              height={200}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s"
              width={200}
            />
          </div>
          <h2 className=" font-semibold text-center  mb-6">Reset Password</h2>
          <TWForm
            resolver={zodResolver(resetPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="my-3">
              <TWInput label="Password" name="password" type="password" />
            </div>
            <div className="my-3">
              <TWInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              isLoading={isPending}
              size="lg"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
              type="submit"
            >
              {isPending ? "Loading" : "  Reset password"}
            </Button>
          </TWForm>
        </div>
      </section>
    </Suspense>
  );
};

export default Page;

"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import loginValidationSchema from "@/src/schemas/login.schema";
import { useLoginUser } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";
import { useUser } from "@/src/context/user.provider";

export type FormInput = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    mutate: handleLoginUser,
    isPending,
    isSuccess,
    data,
  } = useLoginUser();
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const onsubmit = (data: FormInput) => {
    handleLoginUser(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      if (redirect) {
        setIsLoading(true);
        router.push(redirect);
      } else {
        setIsLoading(true);
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isPending && <Loading />}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
        {/* Left Section: Facebook-like Branding */}
        <div className="flex flex-col justify-center text-center md:text-left md:w-1/2 p-10 space-y-4">
          <div>
            <Image
              alt=""
              height={300}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s"
              width={300}
            />
          </div>
          <p className="text-lg">
            Connect with tech experts with share your expretise.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full">
          <TWForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onsubmit}
          >
            <div className="my-3">
              <TWInput label="Email" name="email" type="email" />
            </div>
            <div className="my-3">
              <TWInput label="Password" name="password" type="password" />
            </div>

            {/* Forgot Password link */}
            <div className="text-right">
              <Link
                className="text-sm text-default-500 hover:text-default-700"
                href="/forgotPassword"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </TWForm>

          <hr className="my-6" />
          <div className="text-center">
            <span className="mr-3">New to techwave?</span>
            <Link
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              href="/signup"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

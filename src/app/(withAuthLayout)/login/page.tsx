
"use client";

import TWForm from "@/src/components/UI/form/TWForm";
import TWInput from "@/src/components/UI/form/TWInput";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schemas/login.schema";
import Link from "next/link";
import { useLoginUser } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

export type FormInput = {
  email: string;
  password: string
}

const LoginPage = () => {
  const { mutate: handleLoginUser, isPending, isSuccess, data } = useLoginUser();
  const {  setIsLoading } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const onsubmit = (data: FormInput) => {
    handleLoginUser(data)
  }

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      if (redirect) {
        setIsLoading(true)
        router.push(redirect);
      } else {
        setIsLoading(true)
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
          <div >
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s" alt="" width={300} height={300} />

          </div>
          <p className="text-lg">
            Connect with tech experts with share your expretise.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full">
          <TWForm
            onSubmit={onsubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="my-3">
              <TWInput label="Email" name="email" type="email" />
            </div>
            <div>
              <TWInput label="Password" name="password" type="password" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </TWForm>
          {/* <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Log In
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-500 hover:underline">
                Forgotten password?
              </a>
            </div>
            <hr className="my-6" />
            <div className="text-center">
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Create New Account
              </button>
            </div>
          </form> */}
          <hr className="my-6" />
          <div className="text-center">
            <span className="mr-3">New to techwave?</span>  <Link href={'/signup'} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import signupValidationSchema from "@/src/schemas/signup.schema";
import { useSignupUser } from "@/src/hooks/auth.hook";
import { defalutImage } from "@/src/constant";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";
import Loading from "@/src/components/UI/Loading";

type FormInput = {
  email: string;
  name: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword?: string;
};

const SignupPage = () => {
  const {
    mutate: handleUserSignup,
    isPending,
    data,
    isSuccess,
  } = useSignupUser();
  const router = useRouter();
  const onSubmit = (data: FormInput) => {
    const postData = {
      ...data,
      profileImage: defalutImage,
      role: "user",
    };

    handleUserSignup(postData);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push("/login");
    }
  }, [isPending, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isPending && <Loading />}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
        {/* Left Section: Branding */}
        <div className="flex flex-col justify-center text-center md:text-left md:w-1/2 p-10 space-y-4">
          <div>
            <Image
              alt="Brand Image"
              height={300}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s"
              width={300}
            />
          </div>
          <p className="text-lg">
            Join the network and connect with tech experts around the world.
          </p>
        </div>

        {/* Right Section: Signup Form */}
        <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full">
          <TWForm
            defaultValues={{
              name: "Anik roy",
              email: "anik@gmail.com",
              phone: "017863356131",
              address: "Mirpur",
              password: "123456",
              confirmPassword: "123456",
            }}
            resolver={zodResolver(signupValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="my-3">
              <TWInput label="Name" name="name" type="text" />
            </div>
            <div className="my-3">
              <TWInput label="Email" name="email" type="email" />
            </div>
            <div className="my-3">
              <TWInput label="Address" name="address" type="address" />
            </div>
            <div className="my-3">
              <TWInput label="Phone" name="phone" type="text" />
            </div>
            {/* <div className="my-3">
                            <TWDatePicker
                            label="Date of birth"
                            name="dateOfBirth"
                            />
                            <DatePicker
                                errorMessage={!value ? "Please give your date." : ""}
                                isInvalid={!value ? true : false}
                                variant="bordered" className="min-w-full sm:min-w-[225px]" label="Date of birth" value={value} onChange={setValue} />

                        </div> */}
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
              size="lg"
              type="submit"
            >
              Sign Up
            </Button>
          </TWForm>

          <hr className="my-6" />

          <div className="text-center">
            <span className="mr-3">Already have an account?</span>
            <Link
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600"
              href={"/login"}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

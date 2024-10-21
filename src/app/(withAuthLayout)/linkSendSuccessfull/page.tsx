"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";

const ResetPasswordLinkSentPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="shadow-lg rounded-lg p-8 md:w-[35%] w-[90%] mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12l2 2 4-4M7 12a5 5 0 1010 0 5 5 0 00-10 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Check Your Email
        </h2>
        <p className="text-center  mb-6">
          We’ve sent you an email with instructions to reset your password.
          Please check your inbox and follow the link provided.
        </p>

        {/* Button to return to login */}
        <div className="text-center">
          <Button as={Link} href="/login" size="lg" variant="faded">
            Back to Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordLinkSentPage;

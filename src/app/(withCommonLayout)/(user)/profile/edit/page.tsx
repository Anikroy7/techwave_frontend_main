"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TWForm from "@/src/components/UI/form/TWForm";
import TWInput from "@/src/components/UI/form/TWInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/auth.hook";
import updateUserValidationSchema from "@/src/schemas/updateUser.schema";
import uploadImage from "@/src/utils/uploadImage";
import { useGetMyInfo } from "@/src/hooks/user.hook";

type FormInput = {
  name: string;
  phone: string;
  address: string;
  profileImage?: string;
};

const ProfileEditPage = () => {
  const { data: myData, isPending: myInfoPending } = useGetMyInfo();
  const { setIsLoading } = useUser();
  const [avatarPreview, setAvatarPreview] = useState(
    myData?.data?.profileImage,
  );
  const [newImage, setNewImage] = useState<File | null>(null);
  const {
    mutate: handleUpdateUser,
    isPending,
    data,
    isSuccess,
  } = useUpdateUser();
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setNewImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push("/profile/settings");
      setIsLoading(true);
    }
  }, [isPending, isSuccess]);

  const onSubmit = async (data: FormInput) => {
    let newImageUrl = "";

    if (newImage) {
      newImageUrl = await uploadImage(newImage);
    }
    const updatedData = {
      ...data,
      profileImage: newImageUrl ? newImageUrl : myData?.data?.profileImage,
    };

    handleUpdateUser(updatedData);
    // console.log(updatedData)
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 ">
      {(myInfoPending || isPending) && <Loading />}
      <div className="w-full max-w-2xl p-6 bg-defa rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Edit Profile
        </h1>

        {/* Profile Image Section */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <img
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border border-gray-300"
              src={avatarPreview}
            />
            <label
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
              htmlFor="avatar"
            >
              <input
                accept="image/*"
                aria-label="Upload Avatar"
                className="hidden"
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
              />
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.232 5.232l3.536 3.536M9 11.313l6.293-6.293a2 2 0 112.828 2.828L11.828 14.14a8 8 0 11-2.828-2.828z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
        </div>

        <TWForm
          defaultValues={{
            name: myData?.data?.name,
            phone: myData?.data?.phone,
            address: myData?.data?.address,
          }}
          resolver={zodResolver(updateUserValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <div className="my-3">
              <TWInput label="Name" name="name" type="text" />
            </div>
            <div className="my-3">
              <TWInput label="Address" name="address" type="address" />
            </div>
            <div className="my-3">
              <TWInput label="Phone" name="phone" type="text" />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-4">
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Save Profile
            </Button>
          </div>
        </TWForm>
      </div>
    </div>
  );
};

export default ProfileEditPage;

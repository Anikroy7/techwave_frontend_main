"use client"

import TWForm from "@/src/components/UI/form/TWForm";
import TWInput from "@/src/components/UI/form/TWInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/auth.hook";
import updateUserValidationSchema from "@/src/schemas/updateUser.schema";
import uploadImage from "@/src/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormInput = {
    name: string;
    phone: string;
    address: string;
    profileImage?: string;
}

const ProfileEditPage = () => {
    const { user, isLoading, setUser, setIsLoading   } = useUser();
    const [avatarPreview, setAvatarPreview] = useState(user?.profileImage);
    const [newImage, setNewImage] = useState<File | null>(null);
    const {mutate:handleUpdateUser, isPending, data, isSuccess } = useUpdateUser()
    const router = useRouter()

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setNewImage(file)
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (!isPending && isSuccess && data?.success) {
            router.push("/profile/settings");
            setUser(user)
            setIsLoading(true)
        }
    }, [isPending, isSuccess]);


    const onSubmit = async (data: FormInput) => {
        let newImageUrl = ''
        if (newImage) {
            newImageUrl = await uploadImage(newImage)
        }
        const updatedData = {
            ...data,
            profileImage: newImageUrl ? newImageUrl : user?.profileImage
        }
        handleUpdateUser(updatedData)
        // console.log(updatedData)
    }
    return (
        <div className="min-h-screen flex flex-col items-center p-6 ">
            {(isLoading || isPending) && <Loading />}
            <div className="w-full max-w-2xl p-6 bg-defa rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h1>

                {/* Profile Image Section */}
                <div className="flex justify-center items-center mb-6">
                    <div className="relative">
                        <img
                            src={avatarPreview}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border border-gray-300"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536M9 11.313l6.293-6.293a2 2 0 112.828 2.828L11.828 14.14a8 8 0 11-2.828-2.828z"
                                />
                            </svg>
                        </label>
                    </div>
                </div>

                {/* Form Fields for Editing Profile */}
                {/* Form Fields for Editing Profile */}
                <TWForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(updateUserValidationSchema)}
                    defaultValues={{
                        name: user?.name,
                        phone: user?.phone,
                        address: user?.address,

                    }}
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
        </div >
    );
};

export default ProfileEditPage;

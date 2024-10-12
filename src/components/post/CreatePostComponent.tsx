"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
    ModalBody,

} from "@nextui-org/modal";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Include styles for Quill
import TWSelect from "../UI/form/TWSelect";
import TWForm from "../UI/form/TWForm";
import { getCategories } from "@/src/services/categoryService";
import { Badge } from "@nextui-org/badge";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import { useRouter } from "next/navigation";
import Loading from "../UI/Loading";

type ICategory = {
    title: string
}

type TFormInput = {
    category: string
}

export default function CreatePostComponent() {
    const [content, setContent] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([])
    const { user } = useUser()
    const { mutate: handleCreatePost, isPending, isSuccess, data } = useCreatePost();
    const router = useRouter()
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const allFiles = e.target.files;
        if (allFiles?.length) {
            for (let i = 0; i < allFiles.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview((prev) => [...prev, reader.result as string]);
                    setImages((prev) => [...prev, allFiles[i] as File])
                };
                reader.readAsDataURL(allFiles[i]);
            }
        }

    };

    const handleRemoveImage = (ind: number) => {
        setAvatarPreview([...avatarPreview.filter((image, index) => index !== ind)])
        setImages([...images.filter((image, index) => index !== ind)])
    }


    const handleGetCategories = async () => {
        const categories = await getCategories();
        setCategories(categories.data)
    }
    useEffect(() => {
        handleGetCategories()
    }, [])
    const categoriessObj = categories?.map(c => {
        return {
            key: c.title,
            label: c.title
        }
    })
    // console.log(categoriessObj)
    const onSubmit = async (data: TFormInput) => {
        // console.log(data, content,newImage
        let imageUrls: string[] = [];
        if (images.length > 0) {
            imageUrls = await uploadMultipleImages(images)
        }
        const postData = {
            body: content,
            attachments: imageUrls,
            category: data.category,
            user: user?.userId
        }
        handleCreatePost(postData)

    }
    useEffect(() => {
        if (!isPending && isSuccess && data?.success) {
            router.push("/");
        }
    }, [isPending, isSuccess]);

    return (
        <>
            {isPending && <Loading />}
            <ModalBody>
                {/* Rich Text Editor */}
                <TWForm
                    onSubmit={onSubmit}
                // resolver={zodResolver(signupValidationSchema)}
                // defaultValues={{
                //     name: "Anik roy",
                //     email: "anik@gmail.com",
                //     phone: "017863356131",
                //     address: "Mirpur",
                //     password: '123456',
                //     confirmPassword: '123456'
                // }}
                >
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="Write your post here..."
                    />
                    <div className="mt-4">
                        <TWSelect
                            label="Category" name="category" options={categoriessObj}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-5\800 transition duration-300 ease-in-out ">
                            <div className="flex flex-col items-center justify-center">
                                {/* Attachment Icon from React Icons */}
                                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">
                                    click to upload
                                </span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                    <div className="my-3 flex flex-wrap gap-5">
                        {
                            avatarPreview.map((a, index) => <Badge key={index} onClick={() => handleRemoveImage(index)} className="cursor-pointer" content={<MdClose className="text-white " />} size="lg" color="danger">
                                <Avatar
                                    className="h-40 w-40"
                                    radius="md"
                                    src={a}
                                />
                            </Badge>)
                        }
                    </div>
                    <Button
                        className="my-6 w-full rounded-md bg-default-900 font-semibold text-default"
                        size="md"
                        type="submit"
                    >
                        Post
                    </Button>
                </TWForm>
            </ModalBody>
        </>
    );
}

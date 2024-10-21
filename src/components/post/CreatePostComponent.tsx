"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { ModalBody } from "@nextui-org/modal";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
// const ReactQuill = dynamic(import("react-quill"), {
//   ssr: false,
// });
import "react-quill/dist/quill.snow.css";
import { Badge } from "@nextui-org/badge";
import { useRouter } from "next/navigation";
import TWSelect from "../UI/form/TWSelect";
import TWForm from "../UI/form/TWForm";
import Loading from "../UI/Loading";
import { getCategories } from "@/src/services/categoryService";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import dynamic from "next/dynamic";
import TWInput from "../UI/form/TWInput";
// import ReactQuill from "react-quill";

type ICategory = {
  title: string;
};

type TFormInput = {
  category: string;
  body: string;
  isPaid: string
};

export default function CreatePostComponent() {
  const [content, setContent] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { user } = useUser();
  const {
    mutate: handleCreatePost,
    isPending,
    isSuccess,
    data,
  } = useCreatePost();
  const router = useRouter();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files;

    if (allFiles?.length) {
      for (let i = 0; i < allFiles.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatarPreview((prev) => [...prev, reader.result as string]);
          setImages((prev) => [...prev, allFiles[i] as File]);
        };
        reader.readAsDataURL(allFiles[i]);
      }
    }
  };

  const handleRemoveImage = (ind: number) => {
    setAvatarPreview([
      ...avatarPreview.filter((image, index) => index !== ind),
    ]);
    setImages([...images.filter((image, index) => index !== ind)]);
  };

  const handleGetCategories = async () => {
    const categories = await getCategories();

    setCategories(categories.data);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  const categoriessObj = categories?.map((c) => {
    return {
      key: c.title,
      label: c.title,
    };
  });
  const isPaidObj = [{
    key: "yes",
    label: 'Yes',
  }, {
    key: 'no',
    label: "No"
  }];
  // console.log(categoriessObj)
  const onSubmit = async (data: TFormInput) => {
    // console.log(data, content,newImage
    let imageUrls: string[] = [];

    if (images.length > 0) {
      imageUrls = await uploadMultipleImages(images);
    }
    const postData = {
      body: data.body,
      attachments: imageUrls,
      category: data.category,
      isPaid: data.isPaid === 'yes' ? true : false,
      user: user?.userId,
    };

    handleCreatePost(postData);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push("/profile/settings");
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
          {/* <ReactQuill
            placeholder="Write your post here..."
            theme="snow"
            value={content}
            onChange={setContent}
          /> */}
          <div className="mt-4">
            <TWInput
              label="Tile"
              name="body"
            />
          </div>
          <div className="mt-4">
            <TWSelect
              label="Category"
              name="category"
              options={categoriessObj}
            />
          </div>
          <div className="mt-4">
            <TWSelect
              label="Is Paid"
              name="isPaid"
              options={isPaidObj}
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
                multiple
                className="hidden"
                type="file"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="my-3 flex flex-wrap gap-5">
            {avatarPreview.map((a, index) => (
              <Badge
                key={index}
                className="cursor-pointer"
                color="danger"
                content={<MdClose className="text-white " />}
                size="lg"
                onClick={() => handleRemoveImage(index)}
              >
                <Avatar className="h-40 w-40" radius="md" src={a} />
              </Badge>
            ))}
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

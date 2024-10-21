"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEye,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Comments from "../post/Comments";
import PostDropdown from "../post/PostDropdown";

import { TPost } from "@/src/types";
import { useUpdatePostVote } from "@/src/hooks/post.hook";
import useDebounce from "@/src/hooks/debounce.hook";
import { useUser } from "@/src/context/user.provider";
import { CheckIcon } from "@/src/assets/icons";

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
  const [upvote, setUpvote] = useState(post.upvote);
  const [downvote, setDownvote] = useState(post.downvote);
  const { mutate: handlePostVote } = useUpdatePostVote();
  const debouncedUpvote = useDebounce(upvote.length, 2000);
  const debouncedDownvote = useDebounce(downvote.length, 2000);
  const router = useRouter();
  const { user } = useUser();
  const postcardPdf = useRef(null);

  const handleUpvoteCount = () => {
    if (upvote.includes(user?.userId as string)) {
      setUpvote([...upvote.filter((vote) => vote !== user?.userId)]);
    } else {
      setUpvote([...upvote, user?.userId as string]);
    }
  };
  const handleDownvoteCount = () => {
    if (downvote.includes(user?.userId as string)) {
      setDownvote([...downvote.filter((vote) => vote !== user?.userId)]);
    } else {
      setDownvote([...downvote, user?.userId as string]);
    }
  };

  useEffect(() => {
    if (debouncedUpvote !== post.upvote.length) {
      handlePostVote({ postId: post._id, voteType: "up", votes: upvote });
    }
    if (debouncedDownvote !== post.downvote.length) {
      handlePostVote({ postId: post._id, voteType: "down", votes: downvote });
    }
  }, [debouncedUpvote, debouncedDownvote]);

  const handleGeneratePdf = async () => {
    const inputData = postcardPdf.current;

    if (!inputData) {
      return;
    }
    try {
      const canvas = await html2canvas(inputData);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("postcard.pdf");
    } catch (error) {
      throw new Error("postcard pdf");
    }
  };

  return (
    <Card className="my-4 w-full shadow-lg cursor-pointer">
      <div ref={postcardPdf} className="flex p-4">
        <Avatar
          alt={post.user.name}
          className="mr-4"
          size="lg"
          src={post.user.profileImage || "/default-avatar.png"}
        />
        <div className="flex-grow">
          <div className="flex gap-3 items-center">
            <p className="font-bold">{post.user.name}</p>
            {post.user.isVerified && (
              <Chip
                color="primary"
                startContent={<CheckIcon size={18} />}
                variant="faded"
              >
                Verified
              </Chip>
            )}
            {post.user.followers.includes(user?.userId as string) && (
              <div className="flex items-center text-blue-500">
                <FiCheckCircle className="text-xl mr-2" />
                <p className="text-base">following</p>
              </div>
            )}
          </div>
          <p className="text-gray-500">{post.category}</p>
        </div>
        <PostDropdown post={post} userId={post.user._id} />
      </div>

      <Divider />

      {/* Content section with conditional blur */}
      <div
        className={`p-4 ${(user?.role !== "admin" && !user?.isVerified && post?.isPaid) ? "blur-sm pointer-events-none" : ""
          }`} // Apply blur and disable interaction if not paid
      >
        <div className="text-sm my-4">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        {post.attachments && post.attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {post.attachments.map((attachment, index) => (
              <img
                key={index}
                alt={`attachment-${index}`}
                className="rounded-md max-h-48 object-cover"
                src={attachment}
              />
            ))}
          </div>
        )}
      </div>

      {/* Overlay message for paid content */}
      {(user?.role !== "admin" && !user?.isVerified && post?.isPaid) && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg">
          <p>Unlock this content by subscribing to premium.</p>
        </div>
      )}

      <Divider />

      {!(user?.role !== "admin" && !user?.isVerified && post?.isPaid) && <div className="flex justify-between p-4">
        <div className="flex items-center space-x-2">
          {/* Disable like and comment buttons if the user hasn't paid */}
          <Button
            className="text-blue-500"
            startContent={!upvote.includes(user?.userId as string) ? <AiOutlineLike /> : <AiFillLike />}
            onClick={handleUpvoteCount}
            disabled={post?.isPaid} // Disable when not paid
          >
            {upvote.length}
          </Button>
          <Button
            className="text-red-500"
            startContent={!downvote.includes(user?.userId as string) ? <AiOutlineDislike /> : <AiFillDislike />}
            onClick={handleDownvoteCount}
            disabled={post?.isPaid} // Disable when not paid
          >
            {downvote.length}
          </Button>
          <Button
            isIconOnly
            aria-label="See Details"
            color="warning"
            variant="faded"
            onClick={() => router.push(`/post/${post._id}`)}
          >
            <AiOutlineEye />
          </Button>
          <Button
            isIconOnly
            color="default"
            onClick={() => handleGeneratePdf()}
          >
            <AiOutlineFilePdf className="h-5 w-5" />
          </Button>
        </div>
        <Button startContent={<AiOutlineComment />}>
          {<Comments post={post} />}
        </Button>
      </div>}
    </Card>

  );
};

export default PostCard;

"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineComment, AiOutlineLike, AiOutlineDislike, AiOutlineEye } from "react-icons/ai";
import { FiCheckCircle } from 'react-icons/fi';
import Comments from "../post/Comments";
import { TPost } from "@/src/types";
import { useUpdatePostVote } from "@/src/hooks/post.hook";
import useDebounce from "@/src/hooks/debounce.hook";
import { useUser } from "@/src/context/user.provider";
import PostDropdown from "../post/PostDropdown";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { CheckIcon } from "@/src/assets/icons";

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {

  const [upvote, setUpvote] = useState(post.upvote);
  const [downvote, setDownvote] = useState(post.downvote);
  const { mutate: handlePostVote } = useUpdatePostVote();
  const debouncedUpvote = useDebounce(upvote.length, 2000);
  const debouncedDownvote = useDebounce(downvote.length, 2000);
  const router = useRouter()
  const { user } = useUser();

  const handleUpvoteCount = () => {
    if (upvote.includes(user?.userId as string)) {
      setUpvote([...upvote.filter(vote => vote !== user?.userId)])
    } else {
      setUpvote([...upvote, user?.userId as string])
    }
  };
  const handleDownvoteCount = () => {
    if (downvote.includes(user?.userId as string)) {
      setDownvote([...downvote.filter(vote => vote !== user?.userId)])
    } else {
      setDownvote([...downvote, user?.userId as string])
    }
  };


  useEffect(() => {
    if (debouncedUpvote !== post.upvote.length) {
      handlePostVote({ postId: post._id, voteType: "up", votes: upvote });
    }
    if (debouncedDownvote !== post.downvote.length) {
      handlePostVote({ postId: post._id, voteType: "down", votes: downvote });
    }
  }, [debouncedUpvote, debouncedDownvote])

  return (

    <Card className="my-4 w-full shadow-lg cursor-pointer " >
      <div className="flex p-4">
        <Avatar
          alt={post.user.name}
          className="mr-4"
          size="lg"
          src={post.user.profileImage || "/default-avatar.png"}
        />
        <div className="flex-grow">
          <div className="flex gap-3 items-center">
            <p className="font-bold">{post.user.name}</p>
            {post.user.isVerified && <Chip
              startContent={<CheckIcon size={18} />}
              variant="faded"
              color="primary"
            >
              Verified
            </Chip>}
            {post.user.followers.includes(user?.userId as string) && <div className="flex items-center text-blue-500">
              <FiCheckCircle className="text-xl mr-2" />
              <p className="text-base">
                following
              </p>
            </div>}
          </div>
          <p className="text-gray-500">{post.category}</p>
        </div>

        <PostDropdown userId={post.user._id} post={post} />
      </div>
      <Divider />
      <div className="p-4">
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
      <Divider />
      <div className="flex justify-between p-4">
        <div className="flex items-center space-x-2">
          {!upvote.includes(user?.userId as string) ? (
            <Button
              className="text-blue-500"
              startContent={<AiOutlineLike />}
              onClick={handleUpvoteCount}
            >
              {upvote.length}
            </Button>
          ) : (
            <Button
              className="text-blue-500"
              startContent={<AiFillLike />}
              onClick={handleUpvoteCount}
            >
              {upvote.length}
            </Button>
          )}
          {!downvote.includes(user?.userId as string) ? (
            <Button
              className="text-red-500"
              startContent={<AiOutlineDislike />}
              onClick={handleDownvoteCount}
            >
              {downvote.length}
            </Button>
          ) : (
            <Button
              className="text-red-500"
              startContent={<AiFillDislike />}
              onClick={handleDownvoteCount}
            >
              {downvote.length}
            </Button>
          )}
          <Button onClick={()=>router.push(`/post/${post._id}`)} isIconOnly color="warning" variant="faded" aria-label="See Details">
            <AiOutlineEye className="h-5 w-5" />
          </Button>
        </div>
        <Button startContent={<AiOutlineComment />}>
          {/* {post.comments.length} Comments */}
          {<Comments post={post} />}
        </Button>
      </div>
    </Card >

  );
};

export default PostCard;

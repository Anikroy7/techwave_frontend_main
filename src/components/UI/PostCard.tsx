"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai";

import Comments from "../post/Comments";

import { TPost } from "@/src/types";
import { useUpdatePostVote } from "@/src/hooks/post.hook";
import useDebounce from "@/src/hooks/debounce.hook";

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
  const [upvote, setUpvote] = useState(post.upvote);
  const [downvote, setDownvote] = useState(post.downvote);
  const { mutate: handlePostVote } = useUpdatePostVote();
  const debouncedUpvote = useDebounce(upvote.length, 2000);
  const debouncedDownvote = useDebounce(downvote.length, 2000);

  const handleUpvoteCount = () => {
    if (upvote.find((value: string) => value === post.user._id)) {
      setUpvote([...upvote.filter((value) => value !== post.user._id)]);
    } else {
      setUpvote([...upvote, post.user._id]);
    }
  };
  const handleDownvoteCount = () => {
    if (downvote.find((value: string) => value === post.user._id)) {
      setDownvote([...downvote.filter((value) => value !== post.user._id)]);
    } else {
      setDownvote([...downvote, post.user._id]);
    }
  };

  useEffect(() => {
    if (debouncedUpvote !== post.upvote.length) {
      handlePostVote({ postId: post._id, voteType: "up", votes: upvote });
    }
    if (debouncedDownvote !== post.downvote.length) {
      handlePostVote({ postId: post._id, voteType: "down", votes: downvote });
    }
  }, [
    debouncedUpvote,
    post.upvote.length,
    debouncedDownvote,
    post.downvote.length,
  ]);

  return (
    <Card className="my-4 w-full shadow-lg">
      <div className="flex p-4">
        <Avatar
          alt={post.user.name}
          className="mr-4"
          size="lg"
          src={post.user.profileImage || "/default-avatar.png"}
        />
        <div>
          <h4 className="font-bold">{post.user.name}</h4>
          {/*  <div dangerouslySetInnerHTML={{ __html: details }} /> */}
          <p className="text-gray-500">{post.category}</p>
        </div>
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
          <Button
            className="text-blue-500"
            startContent={<AiFillLike />}
            onClick={handleUpvoteCount}
          >
            {upvote.length}
          </Button>
          <Button
            className="text-red-500"
            startContent={<AiFillDislike />}
            onClick={handleDownvoteCount}
          >
            {downvote.length}
          </Button>
        </div>
        <Button startContent={<AiOutlineComment />}>
          {/* {post.comments.length} Comments */}
          {<Comments post={post} />}
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
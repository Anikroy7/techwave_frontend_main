import { TPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai";



const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
  if (post.isDeleted) {
    return (
      <div className="text-center p-4 text-gray-500">
        This post has been deleted.
      </div>
    );
  }

  return (
    <Card className="my-4 w-full shadow-lg">
      <div className="flex p-4">
        <Avatar
          src={post.user.profileImage || "/default-avatar.png"}
          alt={post.user.name}
          className="mr-4"
          size="lg"
        />
        <div>
          <h4 className="font-bold">{post.user.name}</h4>
          <span className="text-gray-500 text-sm">{post.category.name}</span>
        </div>
      </div>
      <Divider />
      <div className="p-4">
        <p className="text-gray-800 mb-4">{post.body}</p>

        {post.attachments && post.attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {post.attachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment}
                alt={`attachment-${index}`}
                className="rounded-md max-h-48 object-cover"
              />
            ))}
          </div>
        )}
      </div>
      <Divider />
      <div className="flex justify-between p-4">
        <div className="flex items-center space-x-2">
          <Button startContent={<AiFillLike />} className="text-blue-500">
            {post.upvote}
          </Button>
          <Button startContent={<AiFillDislike />} className="text-red-500">
            {post.downvote}
          </Button>
        </div>
        <Button startContent={<AiOutlineComment />}>
          {post.comments.length} Comments
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;

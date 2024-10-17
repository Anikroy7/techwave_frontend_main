import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState, useEffect } from "react";

import Loading from "../UI/Loading";

import { TComment, TPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { useCreateComment } from "@/src/hooks/comment.hook";

export default function Comments({ post }: { post: TPost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: handleCreateComment, isSuccess, data } = useCreateComment();
  const [newComment, setNewComment] = useState("");
  const { user, isLoading } = useUser();
  // State to manage comments locally
  const [comments, setComments] = useState<TComment[]>(post.comments);
  console.log(comments)

  const handlePostComment = () => {
    const commentData = {
      text: newComment,
      user: user?.userId,
      post: post._id,
    };

    handleCreateComment(commentData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const createdComment: TComment = {
        _id: data.data._id,
        text: data.data.text,
        user: {
          _id: user?.userId as string,
          name: user?.name as string,
          profileImage: user?.profileImage || "/default-avatar.png",
        },
        post: post._id,
        isDeleted: false,
      };

      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
    }
  }, [isSuccess, data, user]);

  return (
    <>
      {isLoading && <Loading />}
      <Button onPress={onOpen}>{comments.length} Comments</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                {comments.length > 0 ? (
                  comments.map((comment: TComment) => (
                    <div
                      key={comment._id}
                      className="flex gap-3 p-4 border-b border-gray-200"
                    >
                      {/* User avatar */}
                      <img
                        alt={`${comment.user.name}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                        src={comment.user.profileImage || "/default-avatar.png"}
                      />

                      {/* Comment content */}
                      <div className="flex-1">
                        {/* User info (name + timestamp) */}
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-sm">
                            {comment.user.name}
                          </p>
                          {/* <span className="text-xs text-gray-400">2h ago</span> You can replace with dynamic time */}
                        </div>

                        {/* Comment text */}
                        <p className="mt-1 text-sm text-gray-700">
                          {comment.text}
                        </p>

                        {/* Comment actions (like, reply) */}
                        <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                          <button className="hover:underline">Like</button>
                          <button className="hover:underline">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No comments yet.</p>
                )}
              </ModalBody>

              {/* New comment input section */}
              <div className="flex items-center gap-3 p-4 border-t border-gray-200">
                {/* User avatar */}
                <img
                  alt={`${user?.name}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.profileImage || "/default-avatar.png"}
                />

                {/* Comment input */}
                <div className="flex-1">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
                    placeholder="Write a comment..."
                    rows={1} // Adjust for the number of rows or make it resizable
                    value={newComment} // Controlled value
                    onChange={(e) => setNewComment(e.target.value)} // Handle input change
                  />
                </div>

                {/* Post button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-600"
                  disabled={!newComment.trim()} // Disable button if input is empty
                  onClick={handlePostComment} // Function to post comment
                >
                  Post
                </button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

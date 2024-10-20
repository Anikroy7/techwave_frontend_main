import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";

import Loading from "../UI/Loading";

import { useGetSinglePost } from "@/src/hooks/post.hook";

export default function PostDetails({ postId }: { postId: string }) {
  const { data, isPending } = useGetSinglePost(postId);

  console.log(data);

  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      {isPending && <Loading />}
      <div className=" rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            alt={`${data?.data?.user.name}'s profile`}
            className="w-12 h-12 rounded-full mr-4"
            src={data?.data?.user.profileImage}
          />
          <div>
            <h2 className="font-semibold">{data?.data?.user.name}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(data?.data?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{data?.data?.body}</p>

        {data?.data?.attachments && data?.data?.attachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {data?.data?.attachments.map(
              (attachment: string, index: number) => (
                <img
                  key={index}
                  alt={`Attachment ${index + 1}`}
                  className="rounded-lg shadow"
                  src={attachment}
                />
              ),
            )}
          </div>
        )}

        <div className="flex items-center mt-4">
          <Button className="text-blue-600" size="sm">
            Upvote ({data?.data?.upvote.length})
          </Button>
          <Button className="text-red-600 ml-4" size="sm">
            Downvote ({data?.data?.downvote.length})
          </Button>
        </div>
      </div>

      {/*  <Card className="mb-6 bg-white shadow-md rounded-lg">
                <CardBody>
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    <div className="space-y-4">
                        {post.comments.map((comment, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                                <div className="flex items-center mb-2">
                                    <img src={comment.user.profileImage} alt={`${comment.user.name}'s profile`} className="w-8 h-8 rounded-full mr-2" />
                                    <span className="font-semibold">{comment.user.name}</span>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card> */}

      <Card className="mb-6 shadow-md rounded-lg">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
          <form className="flex flex-col space-y-4">
            <Input required className="rounded-md" placeholder="Your Name" />
            <Textarea
              required
              className="rounded-md"
              placeholder="Your Comment"
              rows={4}
            />
            <Button className="bg-blue-600 text-white rounded-md" type="submit">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}

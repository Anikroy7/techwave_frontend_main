"use client";

import React from "react";

import PostDetails from "@/src/components/post/PostDetails";

const page = ({ params }: { params: { postId: string } }) => {
  return (
    <>
      <PostDetails postId={params.postId} />
    </>
  );
};

export default page;

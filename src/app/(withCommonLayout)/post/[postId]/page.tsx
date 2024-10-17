"use client"

import PostDetails from '@/src/components/post/PostDetails';
import React from 'react';

const page = ({ params }: { params: { postId: string } }) => {

  return (
    <>
      <PostDetails postId={params.postId}/>
    </>
  );
};

export default page;

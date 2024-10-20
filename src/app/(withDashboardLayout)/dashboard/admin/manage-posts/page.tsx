"use client";

import PostsTable from "@/src/components/dashboard/user/PostsTable";
import Loading from "@/src/components/UI/Loading";
import { useGetAllposts } from "@/src/hooks/post.hook";

const Page = () => {
  const { data, isPending } = useGetAllposts();

  return (
    <>
      {isPending && <Loading />}
      <PostsTable posts={data?.data} />
    </>
  );
};

export default Page;

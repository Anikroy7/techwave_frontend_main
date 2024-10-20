"use client";
import Loading from "../../UI/Loading";

import PostsTable from "./PostsTable";

import { useUser } from "@/src/context/user.provider";
import { useGetMyposts } from "@/src/hooks/post.hook";

export default function AllPostsTable() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;
  const { data, isPending } = useGetMyposts({ userId: user?.userId as string });

  return (
    <>
      {isPending && isPending}
      <PostsTable posts={data?.data} />
    </>
  );
}

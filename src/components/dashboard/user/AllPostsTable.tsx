'use client'
import { useUser } from "@/src/context/user.provider";
import Loading from "../../UI/Loading";
import { useGetMyposts } from "@/src/hooks/post.hook";

import PostsTable from "./PostsTable";

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
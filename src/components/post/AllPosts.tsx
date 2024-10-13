"use client"

import { useGetAllposts } from "@/src/hooks/post.hook";
import Loading from "../UI/Loading";
import { TPost } from "@/src/types";
import PostCard from "../UI/PostCard";

const AllPosts = () => {
    const { data, isPending } = useGetAllposts();
    return <>
        {isPending && <Loading />}
        {data?.data?.length > 0 &&
            data?.data?.map((post: TPost) => (
                <PostCard key={post._id} post={post} />
            ))}
    </>
}
export default AllPosts;
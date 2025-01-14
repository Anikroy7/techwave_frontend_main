"use client";

import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import PostCard from "../UI/PostCard";

import { useGetAllposts } from "@/src/hooks/post.hook";
import { TPost } from "@/src/types";
import PostsLoading from "../UI/ScrollingLoading";
import { AiOutlineFileDone } from "react-icons/ai";

const AllPosts = () => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const { mutate: getAll, data, isPending } = useGetAllposts();
  const [allDataFethed, setAllDataFetched] = useState(false)

  const getAllPosts = async () => {
    await getAll({
      page
    })

  };
  useEffect(() => {
    if (data && !isPending) {
      setPosts((prev) => [...prev, ...data?.data?.data])
      setTotalPage(data?.data?.meta?.total)
    }
  }, [data, isPending])

  useEffect(() => {
    console.log(totalPage, allDataFethed)
    if (Math.ceil(totalPage / 10) >= page) {
      getAllPosts();
    } else {
      setAllDataFetched(true)
    }
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => {

          return prev + 1
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>

      {posts?.length > 0 &&
        posts?.map((post: TPost) => (
          <>
            <PostCard key={post._id} post={post} />
          </>
        ))}
      {isPending && <PostsLoading />}
      {allDataFethed && (
        <div className="flex flex-col items-center justify-center mt-8 border-t border-gray-200 pt-6">
          <AiOutlineFileDone className="text-4xl mb-4" />
          <p className="text-lg font-medium text-gray-700 text-center">
            No more posts to display...
          </p>
        </div>
      )}

    </>
  );
};

export default AllPosts;

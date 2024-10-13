import Loading from "../UI/Loading";
import PostCard from "../UI/PostCard";

import { useUser } from "@/src/context/user.provider";
import { useGetMyposts } from "@/src/hooks/post.hook";
import { TPost } from "@/src/types";

const Myposts = () => {
  const { user, isLoading } = useUser();

  const { data, isPending } = useGetMyposts({ userId: user?.userId as string });

  if (isLoading) return <Loading />;

  return (
    <>
      {isPending && <Loading />}
      <section className="flex flex-col gap-6">
        {data?.data?.length > 0 &&
          data?.data?.map((post: TPost) => (
            <PostCard key={post._id} post={post} />
          ))}
      </section>
    </>
  );
};

export default Myposts;

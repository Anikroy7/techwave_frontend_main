import { useUser } from "@/src/context/user.provider";
import { useGetMyposts } from "@/src/hooks/post.hook";
import Loading from "../UI/Loading";
import PostCard from "../UI/PostCard";
import { TPost } from "@/src/types";

const Myposts = () => {
    const { user, isLoading } = useUser();
    if (isLoading) return <Loading />
    const { data, isPending, isSuccess } = useGetMyposts({ userId: user?.userId as string });

    console.log(data, isPending, isSuccess)
    return <>
        {isPending && <Loading />}
        <section className="flex flex-col gap-6">
            {
                data?.data?.length > 0 && data?.data?.map((post:TPost) => <PostCard post={post} key={post._id} />)
            }
        </section>
    </>
}
export default Myposts;
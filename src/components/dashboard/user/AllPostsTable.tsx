'use client'
import { useUser } from "@/src/context/user.provider";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Loading from "../../UI/Loading";
import { useDeletePost, useGetMyposts } from "@/src/hooks/post.hook";
import { TPost } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon } from "@/src/assets/icons";
import PostDetailsModal from "./PostDetailsModal";

import { Button } from "@nextui-org/button";

export default function AllPostsTable() {
    const { user, isLoading } = useUser();
    if (isLoading) return <Loading />;
    const { data, isPending } = useGetMyposts({ userId: user?.userId as string });
    const { mutate: handlePostDelete } = useDeletePost();

    const handleDeletePostButton = (postId: string) => {
        console.log(postId)
        handlePostDelete({ postId })
    }

    return (
        <>
            {isPending && isPending}
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Post Body</TableColumn>
                    <TableColumn>Attachments</TableColumn>
                    <TableColumn>Category</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                {
                    data?.data?.length > 0 ? <TableBody>
                        {
                            data?.data?.map((post: TPost) => <TableRow key={post._id}>
                                <TableCell>
                                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                                </TableCell>
                                <TableCell>{post.attachments?.length ? post.attachments[0] : 'no attachment found...'}</TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <PostDetailsModal post={post} />

                                        {/* <Tooltip content="Edit user">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip> */}
                                       <Button isIconOnly className="bg-transparent" onClick={()=>handleDeletePostButton(post._id)}> <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger-400 cursor-pointer active:opacity-50">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip></Button>
                                       
                                    </div>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody> : <TableBody emptyContent={"No post to display."}>{[]}</TableBody>

                }

            </Table>
        </>
    );
}
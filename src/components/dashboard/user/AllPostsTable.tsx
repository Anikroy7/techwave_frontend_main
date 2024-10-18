'use client'
import { useUser } from "@/src/context/user.provider";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Loading from "../../UI/Loading";
import { useGetMyposts } from "@/src/hooks/post.hook";
import { TPost } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/src/assets/icons";

export default function AllPostsTable() {
    const { user, isLoading } = useUser();
    if (isLoading) return <Loading />;
    const { data, isPending } = useGetMyposts({ userId: user?.userId as string });

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
                                        <Tooltip content="Details">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Edit user">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody> : <TableBody emptyContent={"No post found to display."}>{[]}</TableBody>

                }

            </Table>
        </>
    );
}
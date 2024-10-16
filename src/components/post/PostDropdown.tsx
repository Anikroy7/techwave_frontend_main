
import { DeleteDocumentIcon, EditDocumentIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useDeletePost } from "@/src/hooks/post.hook";
import { useUpdateFollowers } from "@/src/hooks/user.hook";
import { TPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { cn } from "@nextui-org/theme";
import { AiOutlineEllipsis, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';


export default function PostDropdown({ userId, post }: { userId: string, post: TPost }) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const { user } = useUser();
    const { mutate: handlePostDelete } = useDeletePost();
    const { mutate: handleUpdateFollowers } = useUpdateFollowers()
    const handleDeletePost = () => {
        handlePostDelete({ postId: post._id })
    }

    const handleAddFollow = () => {
        handleUpdateFollowers({
            followData: {
                followingId: user?.userId as string,
                type: "add",
                userId: post.user._id
            }
        })
    }
    const handleUnFollow = () => {
        handleUpdateFollowers({
            followData: {
                followingId: user?.userId as string,
                type: "delete",
                userId: post.user._id
            }
        })
    }
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="faded" className="flex items-center transparent">
                    <AiOutlineEllipsis className="text-2xl" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">

                <DropdownItem
                    key="edit"
                    className={`${user?.userId !== userId ? 'hidden' : ""}`}
                    description="Allows you to edit the post"
                    startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    Edit post
                </DropdownItem>

                <DropdownItem
                    key="delete"
                    className={`${user?.userId !== userId ? 'hidden' : ""} text-danger`}
                    color="danger"
                    description="Permanently delete the post"
                    onClick={() => handleDeletePost()}
                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                >
                    Delete post
                </DropdownItem>
                <DropdownItem
                    key="follow"
                    className={`${(user?.userId === userId || post.user.following.includes(user?.userId as string)) ? 'hidden' : ""} text-primary`}
                    onClick={() => handleAddFollow()}
                    color="primary"
                    description="Follow this user"
                    startContent={<AiOutlineUserAdd className="text-3xl" />}
                >
                    Follow
                </DropdownItem>
                <DropdownItem
                    key="unfollow"
                    onClick={() => handleUnFollow()}
                    className={`${(user?.userId === userId || !post.user.following.includes(user?.userId as string)) ? 'hidden' : ""} text-danger`}
                    color="danger"
                    description="Unfollow this user"
                    startContent={<AiOutlineUserDelete className="text-3xl" />}

                >
                    Unfollow
                </DropdownItem>
            </DropdownMenu >


        </Dropdown >
    );
}


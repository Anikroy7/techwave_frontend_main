
import { DeleteDocumentIcon, EditDocumentIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/auth.hook";
import { useDeletePost } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { cn } from "@nextui-org/theme";
import { AiOutlineEllipsis, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';


export default function PostDropdown({ userId, postId }: { userId: string, postId: string }) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const { user } = useUser();
    const { mutate: handlePostDelete } = useDeletePost();
    const {mutate:handleUpdateUser}= useUpdateUser()
    const handleDeletePost = () => {
        handlePostDelete({ postId })
    }

    const handleAddFollow=()=>{
        // handleUpdateUser({followers: [...user?.followers, user]})
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
                    onClick={()=>handleDeletePost()}
                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                >
                    Delete post
                </DropdownItem>
                <DropdownItem
                    key="follow"
                    className={`${user?.userId === userId ? 'hidden' : ""} text-primary`}

                    color="primary"
                    description="Follow this user"
                    startContent={<AiOutlineUserAdd className="text-3xl" />}
                >
                    Follow
                </DropdownItem>
                <DropdownItem
                    key="unfollow"
                    className={`${user?.userId === userId ? 'hidden' : ""} text-danger`}
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


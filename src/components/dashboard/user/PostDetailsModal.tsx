import { EyeIcon } from "@/src/assets/icons";
import { TPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { lightFormat } from "date-fns";
import { FaComment, FaPaperclip, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function PostDetailsModal({ post }: { post: TPost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    body,
    attachments,
    category,
    comments,
    upvote,
    downvote,
    user,
    createdAt,
  } = post;
  const startDate = lightFormat(new Date(createdAt), 'yyyy-MM-dd');
  // console.log(createdAt)
  return (
    <>
      <Button isIconOnly className="bg-transparent" onPress={onOpen}> <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon />
        </span>
      </Tooltip>
      </Button>
      <Modal size={"4xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent >
          {(onClose) => (
            <>
              <section className="p-6 my-4">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <Avatar
                    src={user.profileImage || '/default-profile.png'}
                    alt={user.name}
                    className="mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    {user.isVerified && <Badge color="primary">Verified</Badge>}
                  </div>
                </div>

                {/* Post Body */}
                <p className="mb-4">
                  <div dangerouslySetInnerHTML={{ __html: body }} />
                </p>

                {/* Attachments */}
                {attachments && attachments.length > 0 && (
                  <div className="flex items-center mb-4">
                    <FaPaperclip className="mr-2" />
                    <p>{attachments.length} Attachments</p>
                  </div>
                )}

                {/* Post Info */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">Category: {category}</p>
                  <p className="text-sm text-gray-400">Posted on: {startDate}</p>
                </div>

                {/* Interactions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Button startContent={<FaThumbsUp />} className="text-white bg-transparent">
                      {upvote.length} Likes
                    </Button>
                    <Button startContent={<FaThumbsDown />} className="text-white bg-transparent">
                      {downvote.length} Dislikes
                    </Button>
                    <Button startContent={<FaComment />} className="text-white bg-transparent">
                      {comments.length} Comments
                    </Button>
                  </div>

                </div>
              </section>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
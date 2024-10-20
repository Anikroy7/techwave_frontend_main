"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import CreatePostComponent from "../../post/CreatePostComponent";
import Loading from "../Loading";

import { useUser } from "@/src/context/user.provider";

export default function CreatePostModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, isLoading } = useUser();

  if (user?.role) return <> </>;

  return (
    <>
      {isLoading && <Loading />}
      <Button
        className="p-6 rounded-lg flex gap-3 items-center bg-transparent"
        onPress={onOpen}
      >
        <Avatar src={user?.profileImage} />
        <Input
          labelPlacement="outside"
          placeholder="Share your knowledge"
          type="text"
          variant="underlined"
        />
      </Button>

      <Modal
        className="w-full"
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center">
                Share your throughts
              </ModalHeader>
              <ModalBody>
                <CreatePostComponent />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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

export default function CreatePostModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="p-6 rounded-lg flex gap-3 items-center bg-transparent"
        onPress={onOpen}
      >
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
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

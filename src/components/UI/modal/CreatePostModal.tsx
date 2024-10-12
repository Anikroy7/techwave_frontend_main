"use client"


import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import CreatePostComponent from "../../post/CreatePostComponent";

export default function CreatePostModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (

        <>
            <Button  onPress={onOpen} className="p-6 rounded-lg flex gap-3 items-center bg-transparent">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Input
                    type="text"
                    placeholder="Share your knowledge"
                    labelPlacement="outside"
                    variant="underlined"
                />
            </Button>

            <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} className="w-full">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center">Share your throughts</ModalHeader>
                            <ModalBody>
                                <CreatePostComponent />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TWForm from "../../UI/form/TWForm";
import TWInput from "../../UI/form/TWInput";

import updateUserValidationSchema from "@/src/schemas/updateUser.schema";
import { useUpdateSingleUser } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";
import { EyeIcon } from "@/src/assets/icons";

type FormValue = {
  name: string;
  address: string;
  phone: string;
};

export default function UpdateUserForm({ user }: { user: TUser }) {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: handleUserUpdate, isSuccess } = useUpdateSingleUser();
  const [modalClose, setModalClose] = useState(false);
  const router = useRouter();

  const onSubmit = (data: FormValue) => {
    handleUserUpdate({ userData: data, userId: user._id });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard/admin/manage-users");
    }
  }, [isSuccess, modalClose]);

  return (
    <>
      <Button isIconOnly className="bg-transparent" onPress={onOpen}>
        {" "}
        <Tooltip content="Details">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EyeIcon />
          </span>
        </Tooltip>
      </Button>
      <Modal
        isDismissable={true}
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <section className="p-16">
                <TWForm
                  defaultValues={{
                    name: user?.name,
                    phone: user?.phone,
                    address: user?.address,
                  }}
                  resolver={zodResolver(updateUserValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="my-3">
                    <TWInput label="Name" name="name" type="text" />
                  </div>
                  <div className="my-3">
                    <TWInput label="Address" name="address" type="address" />
                  </div>
                  <div className="my-3">
                    <TWInput label="Phone" name="phone" type="text" />
                  </div>

                  <Button
                    className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                    size="lg"
                    type="submit"
                    onPress={onClose}
                  >
                    Update user
                  </Button>
                </TWForm>
              </section>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

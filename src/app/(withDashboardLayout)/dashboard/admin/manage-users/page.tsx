
"use client"
import { DeleteIcon, EditIcon } from "@/src/assets/icons";
import Loading from "@/src/components/UI/Loading";
import { userGetAllUsers } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";




export default function ALlUsersTable() {
  const { data, isPending } = userGetAllUsers()
  const handleBlockUser = (userId:string) => {

  }
  return (
    <>
      {isPending && <Loading />}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {
            data?.data?.map((user: TUser) => <TableRow key="1">
              <TableCell>
                <Avatar src={user?.profileImage} className="w-20 h-20 text-large" />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>
                <Chip className="capitalize" color={user.status === 'active' ? "success" : 'danger'} size="sm" variant="flat">
                  {user?.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Block user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>)
          }

        </TableBody>
      </Table>
    </>
  );
}
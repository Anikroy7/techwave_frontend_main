
"use client"
import { DeleteIcon } from "@/src/assets/icons";
import UpdateUserForm from "@/src/components/dashboard/admin/UpdateUserForm";
import Loading from "@/src/components/UI/Loading";
import { userGetAllUsers, useUpdateSingleUser } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";




export default function ALlUsersTable() {
  const { data, isPending } = userGetAllUsers();
  const { mutate: handleUserUpdate } = useUpdateSingleUser()
  const handleUpdateUserStatus = (id: string, status: 'active' | "blocked") => {
    handleUserUpdate({ userData: { status }, userId: id })
  }
  const handleUpdateUserRole = (id: string, role: 'admin' | "user") => {
    handleUserUpdate({ userData: { role }, userId: id })
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
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {
            data?.data?.map((user: TUser) => <TableRow key={user._id}>
              <TableCell>
                <Avatar src={user?.profileImage} className="w-20 h-20 text-large" />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell className="uppercase">
                {
                  user?.role !== 'admin' ?
                    <>{user?.role}</>
                    :
                    <>{user?.role}</>
                }
              </TableCell>
              <TableCell>
                <Chip className="capitalize" color={user.status === 'active' ? "success" : 'danger'} size="sm" variant="flat">
                  {user?.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <UpdateUserForm user={user}/>
                  {
                    user?.status === 'active' ? <Button isIconOnly className="bg-transparent" onClick={() => handleUpdateUserStatus(user?._id, 'blocked')}>
                      <Tooltip color="danger" content="Block user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </Button> : <Button
                      onClick={() => handleUpdateUserStatus(user?._id, 'active')}
                      color="success"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Active
                    </Button>
                  }
                  {
                    user?.role === 'admin' ? <Button
                      onClick={() => handleUpdateUserRole(user?._id, 'user')}
                      color="secondary"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Make user
                    </Button> : <Button
                      onClick={() => handleUpdateUserRole(user?._id, 'admin')}
                      color="warning"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Make admin
                    </Button>
                  } 
                </div>
              </TableCell>
            </TableRow>)
          }

        </TableBody>
      </Table>
    </>
  );
}
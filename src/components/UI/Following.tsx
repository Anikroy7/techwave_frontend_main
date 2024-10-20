import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import Loading from "./Loading";

import { userGetMyInfo, useUpdateFollowers } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";

const Following = () => {
  const { data: myData, isPending: myInfoPending } = userGetMyInfo();
  const { mutate: handleUpdateFollowers } = useUpdateFollowers();

  const handleUnFollow = (postUserId: string) => {
    handleUpdateFollowers({
      followData: {
        followingId: myData.data?._id as string,
        type: "delete",
        userId: postUserId,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 w-96">
      {myInfoPending && <Loading />}
      {myData?.data?.following?.length ? (
        myData?.data?.following?.map((user: TUser) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            {/* user Info */}
            <div className="flex items-center space-x-4">
              <Avatar alt={user.name} size="lg" src={user.profileImage} />
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
              </div>
            </div>
            <Button
              className={"bg-transparent text-foreground border-default-200"}
              color="danger"
              radius="full"
              size="sm"
              variant={"bordered"}
              onClick={() => handleUnFollow(user._id)}
            >
              Unfollow
            </Button>
            {/* <Button
                        variant="solid"
                        className="bg-red-600"
                    >
                    </Button> */}
          </div>
        ))
      ) : (
        <p className="text-center">"No followers avaiable"</p>
      )}
    </div>
  );
};

export default Following;

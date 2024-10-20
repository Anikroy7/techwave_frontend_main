import { Avatar } from "@nextui-org/avatar";

import Loading from "./Loading";

import { userGetMyInfo } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";

const Follwers = () => {
  const { data: myData, isPending: myInfoPending } = userGetMyInfo();

  return (
    <div className="flex flex-col gap-6 w-96">
      {myInfoPending && <Loading />}
      {myData?.data?.followers?.length ? (
        myData?.data?.followers?.map((user: TUser) => (
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
          </div>
        ))
      ) : (
        <p className="text-center">"No followers avaiable"</p>
      )}
    </div>
  );
};

export default Follwers;

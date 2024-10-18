"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";

import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/UI/Loading";
import Myposts from "@/src/components/post/Myposts";
import Followers from "@/src/components/UI/Follwers";
import Following from "@/src/components/UI/Following";
import { userGetMyInfo } from "@/src/hooks/user.hook";
import { Chip } from "@nextui-org/chip";
import { CheckIcon } from "@/src/assets/icons";

const Settings = () => {
  const { data: myData, isPending: myInfoPending } = userGetMyInfo()
  console.log(myData)
  return (
    <main className="bg-default bg-opacity-25">
      {myInfoPending && <Loading />}
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <header className="flex flex-wrap items-center p-4 md:py-8">
          <div className="md:w-3/12 md:ml-16">
            <img
              alt="profile"
              className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-gray-400 p-1"
              src={myData?.data?.profileImage}
            />
          </div>

          <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {myData?.data?.name}
              </h2>
              {myData?.data?.isVerified && <Chip
                startContent={<CheckIcon size={18} />}
                variant="faded"
                color="primary"
              >
                Verified
              </Chip>}
              <span
                aria-hidden="true"
                className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
              >
                <i
                  className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"
                />
              </span>

              <Link
                className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block "
                href="/profile/edit"
              >
                Edit
              </Link>
            </div>

            <ul className="hidden md:flex space-x-8 mb-4">
              <li>
                <span className="font-semibold mr-1">{myData?.data?.posts?.length} </span>
                posts
              </li>

              <li>
                <span className="font-semibold mr-1">
                  {myData?.data?.followers?.length}
                </span>
                followers
              </li>
              <li>
                <span className="font-semibold mr-1">
                  {myData?.data?.following?.length}
                </span>
                following
              </li>
            </ul>

            <div className="hidden md:block">
              <h1 className="font-semibold">Address: {myData?.data?.address}</h1>
              <span></span>
              <p>Mobile: {myData?.data?.phone}</p>
            </div>
          </div>


        </header>

        <div className="flex w-full flex-col items-center">
          <Tabs aria-label="Options" color="primary" variant="bordered">
            <Tab
              key="posts"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>My Posts</span>
                </div>
              }
            >
              <Card>
                <CardBody>
                  <Myposts />
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="followings"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Followings</span>
                </div>
              }
            >
              <Card>
                <CardBody >
                  <Following />
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="followers"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Followers</span>
                </div>
              }
            >
              <Card>
                <CardBody>
                  <Followers />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Settings;

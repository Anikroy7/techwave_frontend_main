"use client"

import { FaUserFriends, FaBriefcase, FaEnvelope, FaBell, FaHome } from "react-icons/fa";
import AllPosts from "@/src/components/post/AllPosts";
import CreatePostModal from "@/src/components/UI/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import SuggestFriends from "@/src/components/UI/SuggestFriends";

export default function Home() {
  const { user } = useUser();

  return (
    <section className="min-h-screen ">
      {/* Main Container */}
      <div className="container mx-auto p-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block col-span-1 p-4 rounded-lg shadow-md  h-screen sticky top-0">
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={user?.profileImage}
                />
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <hr />

              {/* Navigation Links */}
              <nav className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 p-2 rounded-lg"
                >
                  <FaHome size={20} />
                  <span className="text-sm">Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-2 rounded-lg"
                >
                  <FaUserFriends size={20} />
                  <span className="text-sm">Friends</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-2 rounded-lg"
                >
                  <FaBriefcase size={20} />
                  <span className="text-sm">Jobs</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-2 rounded-lg"
                >
                  <FaEnvelope size={20} />
                  <span className="text-sm">Messaging</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-2 rounded-lg"
                >
                  <FaBell size={20} />
                  <span className="text-sm">Notifications</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* Feed Section */}
          <main className="col-span-1 lg:col-span-2">
            <div className=" p-4 rounded-lg shadow-md mb-6">
              <CreatePostModal />
            </div>
            <div className="space-y-6">
              <AllPosts />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block col-span-1 p-4 rounded-lg shadow-md  h-screen sticky top-0">
            <h3 className="text-lg font-semibold mb-4">Suggestions for you</h3>
            <SuggestFriends/>
          </aside>
        </div>
      </div>
    </section>
  );
}

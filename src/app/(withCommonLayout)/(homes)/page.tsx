
import AllPosts from "@/src/components/post/AllPosts";
import CreatePostModal from "@/src/components/UI/modal/CreatePostModal";


export default function Feed() {
  
  return (
    <section className="min-h-screen">
      {/* Container */}
      <div className="container mx-auto p-4">
        {/* Feed */}
        <div className="flex flex-col max-w-3xl mx-auto space-y-6">
          {/* Create a Post Section */}
          <CreatePostModal />
        </div>
        <div className="flex flex-col max-w-3xl mx-auto space-y-6">
          <AllPosts/>
        </div>
      </div>
    </section>
  );
}

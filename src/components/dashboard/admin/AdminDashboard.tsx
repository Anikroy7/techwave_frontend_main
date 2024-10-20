import { Card } from "@nextui-org/card";
import { FaRegEye, FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Content Analytics</h1>

      {/* Top section with analytics summary */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Card className=" p-4 flex-1">
          <div className="flex items-center">
            <FaRegEye className="text-3xl mr-3" />
            <div>
              <h4 className="text-2xl font-bold">172,957</h4>
              <h4 className="text-sm">Readers</h4>
            </div>
          </div>
        </Card>

        <Card className=" p-4 flex-1">
          <div className="flex items-center">
            <FaRegThumbsUp className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">384</h3>
              <h3 className="text-sm">Reactions</h3>
            </div>
          </div>
        </Card>

        <Card className=" p-4 flex-1">
          <div className="flex items-center">
            <FaRegCommentDots className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">41</h3>
              <h3 className="text-sm">Comments</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Graph sections */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Readers Summary */}
        <Card className=" p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Readers Summary</h3>
          <div className="bg-purple-500 h-48 rounded-md" />
        </Card>

        {/* Reactions Summary */}
        <Card className=" p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Reactions Summary</h3>
          <div className="bg-cyan-500 h-48 rounded-md" />
        </Card>

        {/* Comments Summary */}
        <Card className=" p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Comments Summary</h3>
          <div className="bg-teal-500 h-48 rounded-md" />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

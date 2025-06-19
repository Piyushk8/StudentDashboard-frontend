import { User } from "lucide-react";

const ProfileHeader = ({cfHandle}:{cfHandle:string}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {cfHandle}'s Profile
          </h1>
          <p className="text-gray-600 mt-1">Competitive Programming Journey</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileHeader from "../components/profileHeader";
import ContestHistory from "../components/ContestHistory";
import ProblemStats from "../components/ProblemStats";
import { getStudentById } from "../lib/API/studentApi";
import Navbar from "../components/Navbar";

export default function StudentProfile() {
  const params = useParams();
  const id = params.id;
  const nav = useNavigate();
  if (!id) {
    nav("/");
    return <div>no student id </div>;
  }
  const queryClient = useQueryClient()
  const {
    data: studentData,
    isLoading: studentLoading,
    isError: studentError,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id).then((res) => res.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (studentLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">
            Loading student profile...
          </p>
        </div>
      </div>
    );
  }

  if (studentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          {/* <p className="text-gray-600 mb-4">{studentError}</p> */}
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar theme={"dakr"} toggleTheme={()=>{}}/>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header Section */}
        <ProfileHeader cfHandle={studentData.cfHandle} />

        {/* Contest Stats Section */}
        {/* Contest History Section */}
        <ContestHistory studentId={studentData._id} />

        {/* Problem Solving Stats Section */}
        <ProblemStats studentId={studentData._id} />
      </div>
    </div>
  );
}

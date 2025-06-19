import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { useState } from "react";
import { getStudentContestStats } from "../lib/API/studentApi";

interface ContestStats {
  totalContests: number;
  ratingGraph: {
    time: string;
    rating: number;
    contest: string;
    rank: number;
  }[];
  avgRating: number;
  avgRank: number;
  totalProblemsSolved: number;
  ratingImprovement: number;
  currentRating: number;
}

const ContestStats = ({ studentId ,contestFilter}: { studentId: string ,contestFilter:string}) => {
    const {
    data: contestStats,
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ["contestStats", studentId, contestFilter],
    queryFn: () =>
      getStudentContestStats(studentId, contestFilter).then((res) => res),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Contest Stats</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Contests</h3>
            <p className="text-2xl font-bold">{contestStats?.totalContests ?? 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Average Rating</h3>
            <p className="text-2xl font-bold">{contestStats?.avgRating ?? 0}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Average Rank</h3>
            <p className="text-2xl font-bold">{contestStats?.avgRank ?? 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Problems Solved</h3>
            <p className="text-2xl font-bold">
              {contestStats?.totalProblemsSolved ?? 0}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Rating Improvement</h3>
            <p className="text-2xl font-bold">
              {contestStats?.ratingImprovement ?? "N/A"}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Current Rating</h3>
            <p className="text-2xl font-bold">{contestStats?.currentRating}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContestStats;

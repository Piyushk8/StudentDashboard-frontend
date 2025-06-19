import {
  Award,
  BarChart3,
  Calendar,
  Loader2,
  Target,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getHeatmapIntensity } from "../lib/util";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getStudentProblemStats } from "../lib/API/studentApi";
import RecentProblems from "./RecentProblems";
import axios from "axios";
interface ProblemStats {
  totalSolved: number;
  averageRating: number;
  avgProblemsPerDay: number;
  mostDifficult: { name: string; rating: number; problemId: string };
  ratingDistribution: Record<string, number>;
  heatmap: Record<string, number>;
  languageStats: Record<string, number>;
  totalSubmissions: number;
}
const ProblemStats = ({ studentId }: { studentId: string }) => {
  const [problemFilter, setProblemFilter] = useState<string>("");
  const queryClient = new QueryClient()
  const {
    data: problemStats,
    isLoading: problemLoading,
    isError: problemError,
    refetch:refetchProblems
  } = useQuery({
    queryKey: ["problemStats", studentId, problemFilter],
    queryFn: () =>
      getStudentProblemStats(studentId, problemFilter).then((data) => data),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: syncStatus,
    refetch: checkSyncStatus,
    isLoading: syncStatusChecking,
    isError: syncStausError,
  } = useQuery({
    queryKey: ["syncStatus", studentId],
    queryFn: () =>
      axios
        .get(`${process.env.VITE_SERVER}/s/${studentId}/sync`)
        .then((res) => res.data),
    enabled: !!studentId,
    refetchInterval: 1000 * 60 * 2, // Check every 2 min
    staleTime: 1000 * 60 * 5,
  });
  console.log("kl",syncStatus)
  useEffect(() => {
    if (syncStatus?.requiresInvalidation) {
        console.log("herer")
        queryClient.invalidateQueries({queryKey:['problemStats', studentId, problemFilter]})

    }
  }, [syncStatus]);

  //   if(!problemStats) return <>No Stats</>

  const problemFilterOptions = [
    { value: "7", label: "Past Week", icon: "⚡" },
    { value: "30", label: "Past Month", icon: "🎯" },
    { value: "90", label: "Past 3 Months", icon: "📈" },
  ];
  const maxHeatmapCount = Math.max(
    ...Object.values(problemStats?.heatmap || {})
  );

  return (
    <div>
      {problemLoading ? (
        <div className="text-center w-full ">
          <Loader2 />
        </div>
      ) : (
        <>
          {problemError && (
            <div className="text-center h-10 w-full text-red">
              {problemError}
            </div>
          )}

          <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Problem Solving Stats
                  </h2>
                </div>

                <div className="relative">
                  <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={problemFilter}
                    onChange={(e) => setProblemFilter(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
                  >
                    {problemFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Key Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Key Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Solved:</span>
                      <span className="font-bold text-lg text-blue-600">
                        {problemStats?.totalSolved}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating:</span>
                      <span className="font-bold text-lg text-purple-600">
                        {Math.round(problemStats?.averageRating ?? 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Problems/Day:</span>
                      <span className="font-bold text-lg text-green-600">
                        {problemStats?.avgProblemsPerDay.toFixed(1)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-blue-200">
                      <div className="text-gray-600 mb-1">Most Difficult:</div>
                      <div className="font-medium text-gray-800">
                        {problemStats?.mostDifficult?.name || "N/A"}
                        {problemStats?.mostDifficult?.rating && (
                          <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                            {problemStats.mostDifficult.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Rating Distribution
                  </h3>
                  {problemStats?.ratingDistribution &&
                  Object.keys(problemStats.ratingDistribution).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(problemStats.ratingDistribution).map(
                        ([bucket, count]) => (
                          <div
                            key={bucket}
                            className="flex justify-between items-center py-2"
                          >
                            <span className="text-gray-700 font-medium">
                              {bucket}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                                  style={{
                                    width: `${
                                      (count /
                                        Math.max(
                                          ...Object.values(
                                            problemStats.ratingDistribution
                                          )
                                        )) *
                                      100
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="font-bold text-purple-600 min-w-[2rem] text-right">
                                {count}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No rating data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Heatmap */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Submission Heatmap
                </h3>
                {problemStats?.heatmap &&
                Object.keys(problemStats.heatmap).length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-7 gap-2 min-w-fit">
                      {Object.entries(problemStats.heatmap).map(
                        ([date, count]) => (
                          <div
                            key={date}
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs
                         font-medium transition-all hover:scale-110 cursor-pointer 
                         ${getHeatmapIntensity(count, maxHeatmapCount)}`}
                            title={`${date}: ${count} submissions`}
                          >
                            {count > 0 ? count : ""}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                      <span>Less</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`w-3 h-3 rounded ${
                              level === 0
                                ? "bg-gray-100 border border-gray-200"
                                : level === 1
                                ? "bg-green-100 border border-green-200"
                                : level === 2
                                ? "bg-green-200 border border-green-300"
                                : level === 3
                                ? "bg-green-400 border border-green-500"
                                : "bg-green-600 border border-green-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      No submission data available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className="w-full h-fit p-1 px-2 text-gray-300 shadow-2xl">
            {syncStatusChecking && <>Checking for updates...</>}
            {syncStausError && <>Error fetching updates</>}
          </div>
          <RecentProblems studentId={studentId} problemFilter={problemFilter} />
        </>
      )}
    </div>
  );
};

export default ProblemStats;

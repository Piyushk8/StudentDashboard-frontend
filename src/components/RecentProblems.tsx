import { Calendar, Trophy } from "lucide-react";
import React from "react";
import { formatDate } from "../lib/util";
import { useQuery } from "@tanstack/react-query";
import { getStudentRecentProblems } from "../lib/API/studentApi";

interface RecentProblem {
  problemId: string;
  problemName: string;
  problemRating: number;
  problemTags: string[];
  submissionTime: string;
  language: string;
  timeMs: number;
  memoryBytes: number;
}
const RecentProblems = ({ studentId ,problemFilter}: { studentId: string ,problemFilter:string}) => {
  const {
    data: recentProblems,
    isLoading: recentLoading,
    isError: recentError,
  } = useQuery({
    queryKey: ["recentProblems", studentId, problemFilter],
    queryFn: () =>
      getStudentRecentProblems(studentId, problemFilter).then((res) => res),
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
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Problems
            </h2>
          </div>
        </div>

        {recentProblems?.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No recent problems found</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 mt-2 lg:-mx-8">
            <div className="inline-block min-w-full px-6 lg:px-8">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Problem
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Rating
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Tags
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Language
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Time
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Memory
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentProblems?.map((problem, index) => (
                    <tr
                      key={problem.problemId}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-25" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div
                          className="font-medium text-gray-800 truncate max-w-xs"
                          title={problem.problemName}
                        >
                          {problem.problemName}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {problem.problemRating}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {problem.problemTags.join(", ")}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          {problem.language}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {problem.timeMs} ms
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {problem.memoryBytes} bytes
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {formatDate(problem.submissionTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentProblems;

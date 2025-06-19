import { Calendar, Filter, Trophy } from "lucide-react";
import React, { useState } from "react";
import {
  formatDate,
  getRatingChangeColor,
  getRatingChangeIcon,
} from "../lib/util";
import ContestStats from "./contestStats";
import { useQuery } from "@tanstack/react-query";
import { getStudentContestHistory } from "../lib/API/studentApi";


const ContestHistory = ({ studentId }: { studentId: string }) => {
  const [contestFilter, setContestFilter] = useState<string>("");
  const {
    data: contestHistory = [],
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ["contestHistory", studentId, contestFilter],
    queryFn: () =>
      getStudentContestHistory(studentId, contestFilter).then((data) => data),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 10,
  });

  const contestFilterOptions = [
    { value: "7", label: "Last 7 Days", icon: "📅" },
    { value: "30", label: "Last 30 Days", icon: "📆" },
    { value: "90", label: "Last 3 Months", icon: "🗓️" },
    { value: "365", label: "Last Year", icon: "📊" },
  ];
console.log("sksl",contestHistory)
  return (
    <>
      <ContestStats studentId={studentId} contestFilter={contestFilter} />
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Contest History
              </h2>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={contestFilter}
                onChange={(e) => setContestFilter(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
              >
                {contestFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {contestHistory.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No contests found for the selected period
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 lg:-mx-8">
              <div className="inline-block min-w-full px-6 lg:px-8">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">
                        Contest
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">
                        Rank
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">
                        Rating
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">
                        Solved
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contestHistory.map((contest, index) => (
                      <tr
                        key={contest.contestId}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-gray-25" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div
                            className="font-medium text-gray-800 truncate max-w-xs"
                            title={contest.contestName}
                          >
                            {contest.contestName}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            #{contest.rank}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">
                              {contest.oldRating}
                            </span>
                            <span
                              className={`font-semibold ${getRatingChangeColor(
                                contest.oldRating,
                                contest.newRating
                              )}`}
                            >
                              {getRatingChangeIcon(
                                contest.oldRating,
                                contest.newRating
                              )}{" "}
                              {contest.newRating}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {contest.problemsSolved}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {formatDate(contest.contestTime)}
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
    </>
  );
};

export default ContestHistory;

// import { useEffect, useState } from "react";
// import {
//   Calendar,
//   Trophy,
//   Target,
//   TrendingUp,
//   Filter,
//   User,
//   Award,
//   BarChart3,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   getStudentById,
//   getStudentContestHistory,
//   getStudentContestStats,
//   getStudentProblemStats,
//   getStudentRecentProblems,
// } from "../lib/API/studentApi";
// import { useQuery } from "@tanstack/react-query";

// export default function StudentProfile() {
//   const params = useParams();
//   const id = params.id;
//   const nav = useNavigate();
//   const [student, setStudent] = useState<any>(null);
//   const [contestHistory, setContestHistory] = useState<Contest[]>([]);
//   const [contestStats, setContestStats] = useState<ContestStats | null>(null);
//   const [problemStats, setProblemStats] = useState<ProblemStats | null>(null);
//   const [recentProblems, setRecentProblems] = useState<RecentProblem[]>([]);
//   const [contestFilter, setContestFilter] = useState("30");
//   const [problemFilter, setProblemFilter] = useState("30");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) nav("/");
//   }, []);
//   const { data, isLoading, isError, refetch, isFetching } = useQuery({
//     queryKey: ["submissions", id],
//     queryFn: () => getStudentContestHistory(id, contestFilter),
//     staleTime: 1000 * 60 * 10, // 10 minutes
//     refetchInterval: 1000 * 60 * 5, // 5 minutes background refresh
//     refetchOnWindowFocus: true,
//   });


//   const problemFilterOptions = [
//     { value: "7", label: "Past Week", icon: "⚡" },
//     { value: "30", label: "Past Month", icon: "🎯" },
//     { value: "90", label: "Past 3 Months", icon: "📈" },
//   ];

//   if (!id) return <>"no id bro"</>;

//   useEffect(() => {
//     if (!id) return;
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const studentRes = await getStudentById(id);
//         setStudent(studentRes.data);
//         // const contestHistoryRes = await getStudentContestHistory(id, contestFilter);
//         // setContestHistory(contestHistoryRes.data);
//         const contestStatsRes = await getStudentContestStats(id, contestFilter);
//         setContestStats(contestStatsRes.data);
//         const problemStatsRes = await getStudentProblemStats(id, problemFilter);
//         setProblemStats(problemStatsRes.data);
//         const recentProblemsRes = await getStudentRecentProblems(
//           id,
//           problemFilter
//         );
//         setRecentProblems(recentProblemsRes.data);
//       } catch (err) {
//         setError("Failed to load data. Please try again.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, contestFilter, problemFilter]);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const getRatingChangeColor = (oldRating: number, newRating: number) => {
//     const change = newRating - oldRating;
//     if (change > 0) return "text-green-600";
//     if (change < 0) return "text-red-600";
//     return "text-gray-600";
//   };

//   const getRatingChangeIcon = (oldRating: number, newRating: number) => {
//     const change = newRating - oldRating;
//     if (change > 0) return "↗️";
//     if (change < 0) return "↘️";
//     return "➡️";
//   };

//   const getHeatmapIntensity = (count: number, maxCount: number) => {
//     if (count === 0) return "bg-gray-100 border border-gray-200";
//     const intensity = Math.ceil((count / maxCount) * 4);
//     const colors = [
//       "bg-green-100 border border-green-200",
//       "bg-green-200 border border-green-300",
//       "bg-green-400 border border-green-500",
//       "bg-green-600 border border-green-700",
//     ];
//     return colors[intensity - 1] || colors[3];
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-gray-600 text-center">
//             Loading student profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             Oops! Something went wrong
//           </h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!student || !problemStats || !contestStats) return null;

//   const maxHeatmapCount = Math.max(
//     ...Object.values(problemStats.heatmap || {})
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-gray-100">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <div className="flex-1">
//               <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 {student.cfHandle}'s Profile
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Competitive Programming Journey
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Contest Stats Section */}
//         {/* <section className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
//           <div className="p-6 lg:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
//                   <Trophy className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Contest Stats
//                 </h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Total Contests</h3>
//                 <p className="text-2xl font-bold">
//                   {contestStats.totalContests}
//                 </p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Average Rating</h3>
//                 <p className="text-2xl font-bold">{contestStats.avgRating}</p>
//               </div>
//               <div className="bg-purple-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Average Rank</h3>
//                 <p className="text-2xl font-bold">{contestStats.avgRank}</p>
//               </div>
//               <div className="bg-yellow-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Total Problems Solved</h3>
//                 <p className="text-2xl font-bold">
//                   {contestStats.totalProblemsSolved}
//                 </p>
//               </div>
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Rating Improvement</h3>
//                 <p className="text-2xl font-bold">
//                   {contestStats.ratingImprovement}
//                 </p>
//               </div>
//               <div className="bg-indigo-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">Current Rating</h3>
//                 <p className="text-2xl font-bold">
//                   {contestStats.currentRating}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section> */}

//         {/* Contest History Section */}
//         {/* <section className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
//           <div className="p-6 lg:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
//                   <Trophy className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Contest History
//                 </h2>
//               </div>

//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <select
//                   value={contestFilter}
//                   onChange={(e) => setContestFilter(e.target.value)}
//                   className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
//                 >
//                   {contestFilterOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {contestHistory.length === 0 ? (
//               <div className="text-center py-12">
//                 <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">
//                   No contests found for the selected period
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto -mx-6 lg:-mx-8">
//                 <div className="inline-block min-w-full px-6 lg:px-8">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Contest
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Rank
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Rating
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Solved
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {contestHistory.map((contest, index) => (
//                         <tr
//                           key={contest.contestId}
//                           className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                             index % 2 === 0 ? "bg-gray-25" : ""
//                           }`}
//                         >
//                           <td className="py-4 px-4">
//                             <div
//                               className="font-medium text-gray-800 truncate max-w-xs"
//                               title={contest.contestName}
//                             >
//                               {contest.contestName}
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                               #{contest.rank}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="flex items-center gap-2">
//                               <span className="text-gray-600">
//                                 {contest.oldRating}
//                               </span>
//                               <span
//                                 className={`font-semibold ${getRatingChangeColor(
//                                   contest.oldRating,
//                                   contest.newRating
//                                 )}`}
//                               >
//                                 {getRatingChangeIcon(
//                                   contest.oldRating,
//                                   contest.newRating
//                                 )}{" "}
//                                 {contest.newRating}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {contest.problemsSolved}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4 text-gray-600">
//                             {formatDate(contest.contestTime)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section> */}

//         {/* Problem Solving Stats Section */}
//         <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="p-6 lg:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="bg-gradient-to-r from-green-400 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center">
//                   <Target className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Problem Solving Stats
//                 </h2>
//               </div>

//               <div className="relative">
//                 <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <select
//                   value={problemFilter}
//                   onChange={(e) => setProblemFilter(e.target.value)}
//                   className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
//                 >
//                   {problemFilterOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//               {/* Key Stats */}
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//                 <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-blue-600" />
//                   Key Statistics
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Total Solved:</span>
//                     <span className="font-bold text-lg text-blue-600">
//                       {problemStats.totalSolved}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Average Rating:</span>
//                     <span className="font-bold text-lg text-purple-600">
//                       {Math.round(problemStats.averageRating)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Problems/Day:</span>
//                     <span className="font-bold text-lg text-green-600">
//                       {problemStats.avgProblemsPerDay.toFixed(1)}
//                     </span>
//                   </div>
//                   <div className="pt-2 border-t border-blue-200">
//                     <div className="text-gray-600 mb-1">Most Difficult:</div>
//                     <div className="font-medium text-gray-800">
//                       {problemStats.mostDifficult?.name || "N/A"}
//                       {problemStats.mostDifficult?.rating && (
//                         <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
//                           {problemStats.mostDifficult.rating}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Distribution */}
//               <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
//                 <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <Award className="w-5 h-5 text-purple-600" />
//                   Rating Distribution
//                 </h3>
//                 {problemStats.ratingDistribution &&
//                 Object.keys(problemStats.ratingDistribution).length > 0 ? (
//                   <div className="space-y-2">
//                     {Object.entries(problemStats.ratingDistribution).map(
//                       ([bucket, count]) => (
//                         <div
//                           key={bucket}
//                           className="flex justify-between items-center py-2"
//                         >
//                           <span className="text-gray-700 font-medium">
//                             {bucket}
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <div className="w-16 bg-gray-200 rounded-full h-2">
//                               <div
//                                 className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
//                                 style={{
//                                   width: `${
//                                     (count /
//                                       Math.max(
//                                         ...Object.values(
//                                           problemStats.ratingDistribution
//                                         )
//                                       )) *
//                                     100
//                                   }%`,
//                                 }}
//                               />
//                             </div>
//                             <span className="font-bold text-purple-600 min-w-[2rem] text-right">
//                               {count}
//                             </span>
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No rating data available</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submission Heatmap */}
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-green-600" />
//                 Submission Heatmap
//               </h3>
//               {problemStats.heatmap &&
//               Object.keys(problemStats.heatmap).length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <div className="grid grid-cols-7 gap-2 min-w-fit">
//                     {Object.entries(problemStats.heatmap).map(
//                       ([date, count]) => (
//                         <div
//                           key={date}
//                           className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs font-medium transition-all hover:scale-110 cursor-pointer ${getHeatmapIntensity(
//                             count,
//                             maxHeatmapCount
//                           )}`}
//                           title={`${date}: ${count} submissions`}
//                         >
//                           {count > 0 ? count : ""}
//                         </div>
//                       )
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
//                     <span>Less</span>
//                     <div className="flex gap-1">
//                       {[0, 1, 2, 3, 4].map((level) => (
//                         <div
//                           key={level}
//                           className={`w-3 h-3 rounded ${
//                             level === 0
//                               ? "bg-gray-100 border border-gray-200"
//                               : level === 1
//                               ? "bg-green-100 border border-green-200"
//                               : level === 2
//                               ? "bg-green-200 border border-green-300"
//                               : level === 3
//                               ? "bg-green-400 border border-green-500"
//                               : "bg-green-600 border border-green-700"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span>More</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500 text-lg">
//                     No submission data available
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Recent Problems Section */}
//         <section className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
//           <div className="p-6 lg:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
//                   <Trophy className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Recent Problems
//                 </h2>
//               </div>
//             </div>

//             {recentProblems.length === 0 ? (
//               <div className="text-center py-12">
//                 <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">
//                   No recent problems found
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto -mx-6 mt-2 lg:-mx-8">
//                 <div className="inline-block min-w-full px-6 lg:px-8">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Problem
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Rating
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Tags
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Language
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Time
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Memory
//                         </th>
//                         <th className="text-left py-4 px-4 font-semibold text-gray-800">
//                           Date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {recentProblems.map((problem, index) => (
//                         <tr
//                           key={problem.problemId}
//                           className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                             index % 2 === 0 ? "bg-gray-25" : ""
//                           }`}
//                         >
//                           <td className="py-4 px-4">
//                             <div
//                               className="font-medium text-gray-800 truncate max-w-xs"
//                               title={problem.problemName}
//                             >
//                               {problem.problemName}
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {problem.problemRating}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {problem.problemTags.join(", ")}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {problem.language}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {problem.timeMs} ms
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {problem.memoryBytes} bytes
//                             </span>
//                           </td>
//                           <td className="py-4 px-4 text-gray-600">
//                             {formatDate(problem.submissionTime)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

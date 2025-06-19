import axios from "axios";
import type {
  Contest,
  ContestStats,
  ProblemStats,
  RecentProblem,
} from "../types";
import { apiUrl } from "../util";

const API = axios.create({ baseURL: `${apiUrl}` });

export const getStudents = () => API.get("/s/");
export const getStudentById = (id: string) => API.get(`/s/${id}`);

export const getStudentContestHistory = (
  id: string,
  historyFilter: string
): Promise<Contest[]> =>
  API.get(`/s/${id}/contests?days=${historyFilter}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Failed to fetch contest history", err);
      return [];
    });
export const getStudentContestStats = async (
  id: string,
  problemFilter: string
): Promise<ContestStats> => {
  try {
    const response = await API.get(
      `/s/${id}/contests/stats?days=${problemFilter}`
    );
    console.log("contestData", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student problems :", error);
    throw error; // Let React Query handle the error state
  }
};
// export const getStudentContestStats = (id: string, problemFilter: string) =>

export const deleteStudent = (id: string) => API.delete(`/s/${id}`);
export const addStudent = (data: any) => API.post("/s/", data);
export const updateStudent = (id: string, data: any) =>
  API.put(`/s/${id}`, data);

export const getStudentProblemStats = async (
  id: string,
  problemFilter: string
): Promise<ProblemStats> => {
  try {
    const response = await API.get(`/s/${id}/pstats?days=${problemFilter}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student problem stats:", error);
    throw error; // Let React Query handle the error state
  }
};
export const getStudentRecentProblems = async (
  id: string,
  problemFilter: string
): Promise<RecentProblem[]> => {
  try {
    const response = await API.get(`/s/${id}/p?days=${problemFilter}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student problems :", error);
    throw error; // Let React Query handle the error state
  }
};

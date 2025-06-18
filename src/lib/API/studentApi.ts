import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000/" });

export const getStudents = () => API.get("/s/");
export const getStudentById = (id: string) => API.get(`/s/${id}`);
export const getStudentContestHistory = (id: string,historyFilter:string) => API.get(`/s/${id}/contests?days=${historyFilter}=`);
export const getStudentContestStats = (id: string,problemFilter:string) => API.get(`/s/${id}/contests/stats?days=${problemFilter}`);
export const deleteStudent = (id: string) => API.delete(`/s/${id}`);
export const addStudent = (data: any) => API.post("/s/", data);
export const updateStudent = (id: string, data: any) => API.put(`/s/${id}`, data);
export const getStudentProblemStats = (id:string,problemFilter:string)=>API.get(`/s/${id}/pstats?days=${problemFilter}`)
export const getStudentRecentProblems = (id:string,problemFilter:string)=>API.get(`/s/${id}/p?days=${problemFilter}`)
  
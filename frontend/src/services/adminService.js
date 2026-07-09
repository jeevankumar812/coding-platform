import api from "./api";

export const createProblem = (data) =>
  api.post("/admin/create-problem", data);

export const getProblemById = (id) => {
  return api.get(`/problems/${id}`);
};

export const updateProblem = (id, data) => {
  return api.put(`/admin/problem/${id}`, data);
};

export const deleteProblem = (id) =>
  api.delete(`/admin/problem/${id}`);

export const getAllUsers = () =>
  api.get("/admin/users");

export const getAllProblems = () =>
  api.get("/admin/problems");

export const getAllRedeems = () =>
  api.get("/admin/redeems");

export const sendReward = (data) =>
  api.post("/admin/sendReward", data);

export const getPendingSubmissions = () =>
  api.get("/admin/pending-submissions");

export const acceptSubmission = (submissionId) =>
  api.put(`/admin/accept/${submissionId}`);

export const rejectSubmission = (submissionId) =>
  api.put(`/admin/reject/${submissionId}`);
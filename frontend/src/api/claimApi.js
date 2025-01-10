import { claimCommunicator } from "./base.js";

const claimApi = {
  communicator: claimCommunicator,
  // companyFilePreference(params) {
  //   return this.communicator.get(`/file-version/`, { params });
  // },

  // !Register User
  registerUser(payload) {
    return this.communicator
      .post(`/users/register`, payload)
      .then((response) => response)
      .catch((error) => {
        throw error; // Ensure the error is thrown so it can be caught on the frontend
      });
  },

  // !Login User
  loginUser(payload) {
    return this.communicator.post(`/users/login`, payload);
  },

  // !Logout User
  logoutuser() {
    return this.communicator.post(`/users/logout`);
  },

  // !Get User Profile
  getProfile() {
    return this.communicator.get(`/users/profile`);
  },

  // !Submit Claim
  submitClaim(payload) {
    return this.communicator.post(`/claim`, payload, {
      headers: {
        "Content-Type": "multipart/form-data", // Let axios set the boundary
      },
    });
  },
  // !Get all Claim (INSURERS)
  getAllClaims(params) {
    return this.communicator.get(`/claim`, { params });
  },

  // !Get Claim by _id
  getClaimById(id) {
    return this.communicator.get(`/claim/${id}`);
  },

  // !Update Claim
  updateClaim(id, payload) {
    return this.communicator.put(`/claim/${id} `, payload);
  },

  // !Get Patient Claim
  getPatientClaims(params) {
    return this.communicator.get(`/claim/patient`, { params });
  },
};

const QUERY_KEYS = {
  companyFilePreference: ["companyFilePreference"],
  createRuleSet: ["createRuleSet"],
};

export { QUERY_KEYS };

export default claimApi;

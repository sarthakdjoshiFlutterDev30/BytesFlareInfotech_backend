import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  experience: { type: String },
  currentCompany: { type: String },
  expectedSalary: { type: String },
  coverLetter: { type: String, required: true },
  linkedinProfile: { type: String },
  portfolio: { type: String },
  resumeUrl: { type: String },
  resumePublicId: { type: String },
  applicationDate: { type: Date, default: Date.now },
});

export default mongoose.model("CareerApplication", careerApplicationSchema);

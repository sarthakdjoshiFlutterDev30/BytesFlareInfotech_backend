import CareerApplication from "../models/CareerApplication.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY ,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "career_resumes",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

export const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, jobTitle, experience, currentCompany, expectedSalary, coverLetter, linkedinProfile, portfolio } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const newApplication = new CareerApplication({
      name,
      email,
      phone,
      jobTitle,
      experience,
      currentCompany,
      expectedSalary,
      coverLetter,
      linkedinProfile,
      portfolio,
      resumeUrl: req.file.path,
      resumePublicId: req.file.filename,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    console.error(error);
    console.log("Error details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { upload };

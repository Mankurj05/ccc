import mongoose from "mongoose";

const statuses = [
  "Applied",
  "Online Assessment",
  "Interview",
  "Offer",
  "Rejected",
  "On Hold"
];

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: 80
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: 80
    },
    status: {
      type: String,
      enum: statuses,
      default: "Applied"
    },
    packageLpa: {
      type: Number,
      min: 0,
      default: 0
    },
    appliedDate: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    }
  },
  { timestamps: true }
);

applicationSchema.index({ company: "text", role: "text", notes: "text" });

export const Application = mongoose.model("Application", applicationSchema);
export { statuses };

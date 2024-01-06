import mongoose from "mongoose";

const TestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    active: {
        type: Boolean,
        trim: true,
        default: true,
    },
  },
  {
    timestamps: true,
  }
);

const OperationModel = mongoose.model("Operation", TestSchema);
export default OperationModel;

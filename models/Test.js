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

const TestModel = mongoose.model("Tests", TestSchema);
export default TestModel;

import mongoose from "mongoose";

const SimulationSchema = mongoose.Schema(
  {
    idpatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    currentPhoto: {
        type: String,
        required: true
    },
    currentMeasures: {
      chest: {
        type: Number,
        trim: true,
      },
      hip: {
        type: Number,
        trim: true,
      },
      waist: {
        type: Number,
        trim: true,
      },
      legs: {
        type: Number,
        trim: true,
      },
      arms: {
        type: Number,
        trim: true,
      },
    },
    simlationPhoto: {
        type: String,
        required: true
    },
    simulationMeasures: {
      chest: {
        type: Number,
        trim: true,
      },
      hip: {
        type: Number,
        trim: true,
      },
      waist: {
        type: Number,
        trim: true,
      },
      legs: {
        type: Number,
        trim: true,
      },
      arms: {
        type: Number,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const SimulationModel = mongoose.model("Simulations", SimulationSchema);

export default SimulationModel;

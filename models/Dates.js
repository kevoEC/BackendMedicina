import mongoose from "mongoose";

const DateSchema = mongoose.Schema(
  {
    day: {
      type: Date,
      // required: true,
      trim: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    tipoAgenda:{
      type: String,
      trim: true
    },
    operationDescrip:{
      type: String,
      trim: true
    },
    operationObs:{
      type: String,
      trim: true
    },
    comments: {
      type: String,
      required: false,
    },
    recipe: {
      type: String,
      required: false,
    },
    idpatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    idespecialist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    record: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
      required: false,
    },
    active: {
      type: Boolean,
      trim: true,
      default: true,
    },
    callUrl: {
      type: String,
      default: ''
    },
    callId: {
      type: String,
      default: ''
    },
    
  },

  {
    timestamps: true,
  }
);

const DateModel = mongoose.model("Dates", DateSchema);

export default DateModel;

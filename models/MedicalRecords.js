import mongoose from "mongoose";

const RecordSchema = mongoose.Schema(
  {
    iddate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dates",
      required: true,
    },
    isMain: {
      type: Boolean,
      trim: true,
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
    active: {
      type: Boolean,
      trim: true,
      default: false,
    },
    esAptoOperation: {
      type: Boolean,
      trim: true,
    },
    recipe: [
      {
        name: {
          type: String,
          trim: true,
        },
        dose: {
          type: String,
          trim: true,
        },
        frequency: {
          type: String,
          trim: true,
        },
      },
    ],
    diet: [
      {
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    activity: [
      {
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    care: [
      {
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    Test: [
      {
        name: {
          type: String,
          trim: true,
        }
      },
    ],

    testResults: [
      {
        url: {
          type: String,
        },
        name: {
          type: String,
        }
      }
    ],

    associatedTests: [
      {
        name: {
          type: String,
          trim: true,
        }
      },
    ],

    generalInfo: {
      bornDate: {
        type: Date,
        trim: true,
      },
      bornPlace: {
        type: String,
        trim: true,
      },
      ci: {
        type: String,
        trim: true,
      },
      civilState: {
        type: String,
        trim: true,
      },
      ocupation: {
        type: String,
        trim: true,
      },
      profession: {
        type: String,
        trim: true,
      },
      referredBy: {
        type: String,
        trim: true,
      },
    },

    contactInfo: {
      address: {
        type: String,
        //   validate: {
        //     validator: function () {
        //       return this.isPatient != true && this.address != null;
        //     },
        //     message: "Direccion requerida",
        //   },
        trim: true,
      },
      phone: {
        type: Number,
        trim: true,
      },
    },

    medicalInfo: {
      height: {
        type: Number,
        trim: true,
      },
      imc: {
        type: Number,
        trim: true,
      },
      weight: {
        type: Number,
        trim: true,
      },
      isAllowed: {
        type: Boolean,
        trim: true,
      },
      clinichistory: {
        type: String,
        trim: true,
      },
      relationship: {
        type: String,
        trim: true,
      },
      distribution: {
        type: String,
        trim: true,
      },
      CEspecial: {
        type: Boolean,
        trim: true,
      },
      hospitalization: {
        type: Boolean,
        trim: true,
      },
      room: {
        type: String,
        trim: true,
      },
      emergency: {
        type: Boolean,
        trim: true,
      },
      comments: {
        type: String,
      },
    },

    nutriInfo: {
      allergies: [
        {
          name: {
            type: String,
            trim: true,
          },
        },
      ],
      neckMeasurement: {
        type: Number,
        trim: true
      },
      armsMeasurement: {
        type: Number,
        trim: true
      },
      backMeasurement: {
        type: Number,
        trim: true,
      },
      waistMeasurement: {
        type: Number,
        trim: true,
      },
      hipMeasurement: {
        type: Number,
        trim: true,
      },
      legsMeasurement: {
        type: Number,
        trim: true,
      },
      exercisePerWeek: {
        type: Number,
        trim: true,
      },
      dailyWater: {
        type: Number,
        trim: true,
      },
      comments: {
        type: String,
      },
      isAllowed: {
        type: Boolean,
        trim: true,
      },
    },

    psychologistInfo: {
      comments: {
        type: String,
      },
      isAllowed: {
        type: Boolean,
        trim: true,
      },
    },

    comments: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", RecordSchema);

export default Record;

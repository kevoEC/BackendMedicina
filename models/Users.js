import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,

      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isDoctor: {
      type: Boolean,
      trim: true,
      default: false,
    },
    isPatient: {
      type: Boolean,
      trim: true,
      default: false,
    },
    isPychologist: {
      type: Boolean,
      trim: true,
      default: false,
    },
    isNutri: {
      type: Boolean,
      trim: true,
      default: false,
    },
    active: {
      type: Boolean,
      trim: true,
      default: true,
    },
    lastLoginDate: {
      type: Date,
      trim: true,
    },
    dates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dates",
      },
    ],
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
      },
    ],
    token: {
      type: String,
    },
    bodyImages: [
      {
        name: {
          type: String,
          trim: true,
        },
        url: {
          type: String,
        },
      },
    ],
    notifToken: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = mongoose.model("Usuarios", UserSchema);

export default User;

import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isRead: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  NotificationSchema
);

export default Notification;

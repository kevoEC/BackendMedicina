import Notification from "../models/Notifications.js";
import mongoose from "mongoose";

const notificationsByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const notifications = await Notification.find({ receiverId: new mongoose.Types.ObjectId(receiverId) }).populate('senderId');
    let sortedNotifs = []
    if(notifications.length > 0){
      sortedNotifs = notifications.sort((a, b) => b.createdAt - a.createdAt);
    }
    res.status(200).json({ data: sortedNotifs, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res
      .status(200)
      .json({ msg: "Notificación creada correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};



const readNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notifExist = await Notification.findById(id);

    if (!notifExist) {
      const error = new Error("Notificación no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    notifExist.isRead = true
    const notifstored = await notifExist.save();
    res.status(200).json({ msg: notifstored, status: true });

  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

export { createNotification, notificationsByReceiver, readNotification };
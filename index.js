import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import recordRoutes from "./routes/recordsRoutes.js";
import datesRoutes from "./routes/datesRoutes.js";
import frequentQuestionsRoutes from "./routes/frequentQuestionsRoutes.js";
import agoraRoutes from "./routes/agoraRoutes.js";
import notifRoutes from "./routes/notifRoutes.js";
import simulationsRoutes from "./routes/simulationsRoutes.js";
import testsRoutes from "./routes/testsRoutes.js"
import envsRoutes from "./routes/envsRoutes.js"
import operationRoutes from "./routes/operationRoutes.js"
import meshRoutes from "./routes/meshRoutes.js"

import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { CronJob } from "cron";
import Notification from "./models/Notifications.js";
import DateModel from "./models/Dates.js";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const upload = multer(); // config
const app = express();
app.use(express.json());
app.use(upload.any());

/*FIREBASE
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "bypassgastricoec",
    "private_key_id": "48dc308560c60cf059fa715a7b5518d57bf95697",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDAKPVwjoINs9d+\nBhYfT6oEav6mxar79PuE0IvCjXJcZbQAT7bS/o0Imb2KpUqkLoqsFRBHzOzSLPSu\ntY76PIcepRBCw/nzSb2E6G7OB4jzIvAnTf0TuQUNqgfn5XJsrVedD2q5spUKQlSM\nnRlsAZlhTHbSzMwkb/VlTB31NO5xaXcFC3E6/CbriUscO9+3VECLz5d8OKm21k90\nSchrDbhXL9cAPerwVxoCHGKXuEHnbdGhOBrNBIXByDVHtZtdWyaW+q6NMw+23cl4\nL2x85xPCHzQtDwUKbN99Ggx2Qb/wSOQRAIwfeALhmN2QurmInaqYsQpbJAITsjIT\nB8Bvu1tVAgMBAAECggEACBlFBhcZ5LSMlstwRj/BlVZIrXdNdmxqTbwxj710MVaF\n+7D5+xi7kYrtO2xg+3XZf79f6she8mXu2agqqPt0R50PiBWhyxhzn0GukQqUDoja\nVBKMFOpqcjUVO53msMbgSoaaUGfcf5l93iYTqrYpV6AoR+HvkdkrUtDrWE8zsRFJ\nqsQPuULXLORkWDFJ/+AW+sQ2YzXtXFJYOjrgLL8cY+38IucucD7pRdGk27569rbd\nwSBo5l16pbJDAZoEZGeEEuZaRbB5QQHIkclWwBAlvA86GkOwTDHpQpOm9upJjVqn\n8HedAdkxwbQ8XEXxSUXGc+RV9XaxoRoeqmtji8XXhwKBgQD+pCQ87Dqmjpl9AgzO\n6a4jog197t2XYRBNrQPDGAzvmyEHKPfiIdnX0IU9fqE7WAi/qbiV24yE7Fmrdgi3\nNpWhdVXEOGYA4jDA3tci6yUvJhFG96WgTqgKZ3g07XlNBwdWTaG/CkE+3zkT8U+z\nHzlc3RIvi6jK5JuJX/qiFIPUhwKBgQDBL3adJg/hUNg5HZnKfOnjEtrJHEDRMV33\nMkRABxQRbBV6nFNSQWSopI/vr5Nu9Xkjk8ZAqnm3fJD/aNR+yo0WWukfmgMzCznI\nyhrMShhUWQLRQZdP7XlYnLnX0LzDuht/qfYEFaY+ktSsbT05jYX0XJM34gW2a3Bv\nUM+1v5pkQwKBgQDe07oWSc2lFGIB/zpAEkLdUaCm09C6+CgxILaLEU+4mLJVNqd8\nDY04inMd9eKXMJkvRxCMqnuTkdOB9B76XFyh1jCALa4tFcH99MKj/ssiMBisVmds\nGYh42kRZZHliS0VDY1mn+AxSPToQVnkc0LT8q0OPsZG6QkRM+V00WelmnwKBgQCY\nkxPrKZSBL4iWE3rTIbTXUpzZGSdYENVV1q1wpCaFXAfavnxQCrWlO9MySkj26Yiz\nQJLjn8Bh2k/qaLDrMq4badGU096TAdqxam2fyyVL+MDw5AzNY5DjG2TrvkBXlTUC\nrwlOUIrsAKtXQy+HtO6HAFaFXE2GtXQndnuV363gYQKBgQCx1wbKWsFGpnHnD4cY\nCoDg9qTtXeWD2Jcip/ERE3U5IyyV5Gf6Y7HKHi5FaEqr/U9xt5Ra1+CnIzX/fJ1O\nbu6dCLIhGDBBSY5hILBWPNE7cSIiYdQfit8g+uEj1RDo+yBxhtJKwd/JKjMyMnm3\ngxvfXxLyULyS4TmDYuBUGei2QA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zfpfp@bypassgastricoec.iam.gserviceaccount.com",
    "client_id": "111622017455590183109",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zfpfp%40bypassgastricoec.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
});
END FIREBASE*/

conectarDB();

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL];

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dates", datesRoutes);
app.use("/api/frequentQuestions", frequentQuestionsRoutes);
app.use("/api/agora", agoraRoutes);
app.use("/api/notifications", notifRoutes);
app.use("/api/simulations", simulationsRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/envs", envsRoutes);
app.use("/api/operationInd", operationRoutes);

app.use("/api/mesh", meshRoutes);


export const supaNotif = () => {
  // SUPABASE INTEGRATION
  // SEND MESSAGE TO UPDATE NOTIFICATIONS
  const clientB = createClient(
    "https://oqcxpijzaddmvyzlslam.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xY3hwaWp6YWRkbXZ5emxzbGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MDMyMDgsImV4cCI6MjAwOTk3OTIwOH0.AwrfE3NvI5pA46ThsDQ0BN7atamyPQmm_Kk8P7Usl48"
  );
  const channelB = clientB.channel("room-1");
  channelB.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      channelB.send({
        type: "broadcast",
        event: "test",
        payload: {
          message: "UPDATE NOTIFICATIONS",
        },
      });
    }
  });
  // END SUPABASE INTEGRATION
};

const job = new CronJob(
  "*/5 * * * *	",
  //"* * * * * *",
  async function () {
    console.log(
      "Ha llegado el momento de verificar si una cita está próxima a llegar"
    );
    try {
      const ahora = new Date(); // Obtiene la hora actual
      ahora.setSeconds(0, 0);
      console.log("ahora", ahora);
      /* Establece la hora de inicio del día actual (a las 00:00:00)
      const inicioDelDia = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        ahora.getDate()
      );

      // Establece la hora de fin del día actual (a las 23:59:59)
      const finDelDia = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        ahora.getDate(),
        23,
        59,
        59
      );
      */

      
      // Calcula la hora futura (5 horas y 5 minutos después)
      // const horaFutura = new Date(ahora.getTime() + (5 * 60 + 5) * 60000); // 5 horas y 5 minutos en milisegundos
      const horaFutura = new Date(ahora.getTime() + 5 * 60000); // 5 minutos en milisegundos
      console.log('hora futura', horaFutura)

      const fechaObjetivo = new Date(ahora.getTime() + 5 * 60000);
      fechaObjetivo.setSeconds(0, 0);
      console.log('hora objetivio', fechaObjetivo)

      const comingDates = await DateModel.find({
        start: {
          $gte: ahora.toISOString(),
          $lte: fechaObjetivo.toISOString()
        }
      })
        .populate("idpatient")
        .populate("idespecialist");

      console.log("comingDates", comingDates);

      if (comingDates.length > 0) {
        const baseTitle = "RECORDATORIO: En 5 minutos tienes una cita con: ";

        comingDates.forEach(async (comingDate) => {
          const titles = {
            toSpecialist:
              baseTitle +
              comingDate.idpatient.firstname +
              " " +
              comingDate.idpatient.lastname,
            toPatient:
              baseTitle +
              comingDate.idespecialist.firstname +
              " " +
              comingDate.idespecialist.lastname,
          };

          const senders = {
            toSpecialist: comingDate.idpatient._id,
            toPatient: comingDate.idespecialist._id,
          };

          const receivers = {
            toSpecialist: comingDate.idespecialist._id,
            toPatient: comingDate.idpatient._id,
          };

          const notificationToPatient = new Notification({
            title: titles.toPatient,
            senderId: senders.toPatient,
            receiverId: receivers.toPatient,
            refId: comingDate._id,
          });
          await notificationToPatient.save();

          console.log("Notificacion para el paciente creada con exito");
          supaNotif();

          const notificationToSpecialist = new Notification({
            title: titles.toSpecialist,
            senderId: senders.toSpecialist,
            receiverId: receivers.toSpecialist,
            refId: comingDate._id,
          });
          await notificationToSpecialist.save();
          console.log("Notificacion para el especialista creada con exito");
          supaNotif();
        });
      }
    } catch (error) {
      console.log(error.message);
      console.log("ALGO SALIÓ MAL");
    }
  },
  null,
  true,
  "America/Guayaquil"
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

import createId from "../helpers/createId.js";
import createJWT from "../helpers/createJWT.js";
import {
  emailCredentials,
  emailCredentialsSpecialists,
  emailForgetPassword,
  emailInfo,
  emailNutriWarning,
  emailWarning,
  testEmail,
} from "../helpers/emails.js";
import DateModel from "../models/Dates.js";
import Record from "../models/MedicalRecords.js";
import SimulationModel from "../models/Simulations.js";
import User from "../models/Users.js";

const registerPatients = async (req, res) => {
  const { email, isPychologist, isDoctor, isNutri, isPatient, code } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isDoctor || isPychologist || isNutri || !isPatient) {
      const error = new Error("El usuario debe ser un Paciente");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();

      emailCredentials({
        firstname: user.firstname,
        email: user.email,
        code,
      });
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const registerDoctors = async (req, res) => {
  const { email, isPatient, isPychologist, isNutri, isDoctor } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isPatient || isPychologist || isNutri || !isDoctor) {
      const error = new Error("El usuario debe ser un Doctor");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const editUsers = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(401).json({ msg: error.message });
    }

    userExist.firstname = req.body.firstname || userExist.firstname;
    userExist.lastname = req.body.lastname || userExist.lastname;
    userExist.bodyImages = req.body.bodyImages || userExist.bodyImages;
    userExist.notifToken = req.body.notifToken || userExist.notifToken;
    const userstored = await userExist.save();
    res.status(200).json({ msg: userstored, status: true });
  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const ChangeState = async (req, res) => {
  const { id } = req.body;
  const { user } = req;
  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(401).json({ msg: error.message });
    }
    if (!user.isDoctor) {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      userExist.active = !userExist.active;
      const userstored = await userExist.save();
      res.status(200).json({ msg: userstored, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const editProfile = async (req, res) => {
  const { user } = req;
  try {
    const userExist = await User.findById(user._id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(400).json({ msg: error.message, status: false });
    }

    userExist.firstname = req.body.firstname || userExist.firstname;
    userExist.lastname = req.body.lastname || userExist.lastname;
    userExist.password = req.body.password || userExist.password;
    userExist.bodyImages = req.body.bodyImages || userExist.bodyImages;
    const userstored = await userExist.save();
    res.status(200).json({ msg: userstored, status: true });
  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const registerNutri = async (req, res) => {
  const { email, isPatient, isPychologist, isNutri, isDoctor, code } = req.body;

  const UserExist = await User.findOne({ email: email });
  const AutoPassword = createId();

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isPatient || isPychologist || !isNutri || isDoctor) {
      const error = new Error("El usuario debe ser un Nutriologo");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      user.password = AutoPassword;
      const storedUser = await user.save();

      emailCredentialsSpecialists({
        firstname: user.firstname,
        email: user.email,
        password: AutoPassword,
        code,
      });
      res.status(200).json({ msg: storedUser, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const registerPsicologist = async (req, res) => {
  const { email, isPatient, isPychologist, isNutri, isDoctor, code } = req.body;

  const UserExist = await User.findOne({ email: email });
  const AutoPassword = createId();

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isPatient || !isPychologist || isNutri || isDoctor) {
      const error = new Error("El usuario debe ser un Psicologo");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      user.password = AutoPassword;
      const storedUser = await user.save();

      emailCredentialsSpecialists({
        firstname: user.firstname,
        email: user.email,
        password: AutoPassword,
        code,
      });

      res.status(200).json({ msg: storedUser, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (user.email != email) {
    const error = new Error("El email es incorrecto");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if ((await user.comprobarPassword(password)) && user.email != email) {
    const error = new Error("El email y contraseña son incorrectos");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (!user.active) {
    const error = new Error("El usuario se encuentra desactivado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (await user.comprobarPassword(password)) {
    const time = Date.now();
    const today = new Date(time);
    user.lastLoginDate = today;

    res.status(200).json({
      _id: user._id,
      token: createJWT(user._id),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isPatient: user.isPatient,
      isDoctor: user.isDoctor,
      isPychologist: user.isPychologist,
      isNutri: user.isNutri,
      lastLoginDate: user.lastLoginDate,
      dates: user.dates || [],
      status: true,
      bodyImages: user.bodyImages || [],
    });
    user.save();
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message, status: false });
  }
};

const forgetPassword = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    user.token = createId();
    await user.save();
    emailForgetPassword({
      email: user.email,
      firstname: user.firstname,
      token: user.token,
      code,
    });
    res.status(200).json({
      msg: "Hemos enviado un email a su correo con las istrucciones para recuperar su contraseña",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const findoutToken = async (req, res) => {
  const { token } = req.params;
  const ValidToken = await User.findOne({ token });
  if (ValidToken) {
    res
      .status(200)
      .json({ msg: "Token valido y el usuario existe", status: true });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message, status: false });
  }
};

const NewPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    try {
      user.password = password;
      user.token = "";

      await user.save();
      res.json({ msg: "Contraseña Modificado Correctamente", status: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message, status: false });
  }
};

const getPatients = async (req, res) => {
  const { user } = req;

  try {
    const patients = await User.find({ isPatient: true }).populate({
      path: "dates",
      populate: {
        path: "record",
      },
    });
    res.status(200).json({ data: patients, status: true });
    console.log(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  /*
  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }
  */
  try {
    const patients = await User.find({ _id: id, isPatient: true }).populate({
      path: "dates",
      populate: {
        path: "record",
      },
    });

    if (!patients[0]) {
      const error = new Error("el usuario no es un paciente");
      return res.status(400).json({ msg: error.message, status: false });
    }

    res.status(200).json({ data: patients, status: true });
    console.log(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getDateSpecialists = async (req, res) => {
  const { user } = req;
  try {
    if (!user.dates || user.dates.length === 0) {
      const specialists = await User.find({ isDoctor: true });
      res.status(200).json({ data: specialists, status: true });
    } else if (user.dates.length > 0) {
      const specialists = await User.find({
        $or: [{ isDoctor: true }, { isNutri: true }, { isPychologist: true }],
      });
      res.status(200).json({ data: specialists, status: true });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getSpecialists = async (req, res) => {
  const { active } = req.query;
  console.log(active);
  try {
    const specialists = await User.find({
      $or: [{ isNutri: true }, { isPychologist: true }, { isDoctor: true }],
    })
      .populate({
        path: "dates",
        populate: {
          path: "record",
        },
      })
      .populate("patients");
    res.status(200).json({ data: specialists, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getSpecialist = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const specialist = await User.find({
      _id: id,
      $or: [{ isNutri: true }, { isPychologist: true }],
    })
      .populate({
        path: "dates",
        populate: {
          path: "record",
        },
      })
      .populate("patients");

    if (!specialist[0]) {
      const error = new Error("el usuario no es un especialista");
      return res.status(400).json({ msg: error.message, status: false });
    }

    res.status(200).json({ data: specialist, status: true });
    console.log(specialist);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.status(200).json({ data: user, status: true });
};

const getUsersRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const users = await User.where("lastLoginDate").ne(null);

    users.sort((date1, date2) => date2.lastLoginDate - date1.lastLoginDate);

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getUsersRegisterRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const users = await User.find();

    users.sort((date1, date2) => date2.createdAt - date1.createdAt);

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const Info = async (req, res) => {
  const { email, firstname, phone, code } = req.body;
  console.log(email);
  try {
    emailInfo({
      firstname: firstname,
      email: email,
      phone: phone,
      code,
    });
    res.status(200).json({ msg: "Correo enviado correctamente", status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const sendWarning = async (req, res) => {
  const { email, code, sendToNutri } = req.body;

  try {
    emailWarning({
      email: email,
      code,
    });

    let nutris = [];
    if (sendToNutri) {
      nutris = await User.find({ isNutri: true });
    }

    if (nutris.length > 0) {
      const patient = User.find({ email: email });
      if (patient.length > 0) {
        nutris.map((nutri) => emailNutriWarning(patient[0], nutri.email, code));
      }
    }

    res.status(200).json({ msg: "Correo enviado exitosamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const sendTest = async (req, res) => {
  try {
    testEmail(req.body);
    res.status(200).json({ msg: "Correo enviado exitosamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const searchPatients = async (req, res) => {
  const { search } = req.query;
  try {
    const patients = await User.find({ isPatient: true }).populate({
      path: "dates",
      populate: {
        path: "record",
      },
    });

    const filteredPatients = patients.filter(
      (sp) =>
        sp.firstname.toLowerCase().includes(search.toLowerCase()) ||
        sp.lastname.toLowerCase().includes(search.toLowerCase()) ||
        (sp.firstname.toLowerCase() + " " + sp.lastname.toLowerCase()).includes(
          search.toLowerCase()
        ) ||
        sp.email.toLowerCase().includes(search.toLowerCase())
    );

    if (!patients[0]) {
      const error = new Error("el usuario no es un paciente");
      return res.status(400).json({ msg: error.message, status: false });
    }

    res
      .status(200)
      .json({ status: true, search: search, data: filteredPatients });
    console.log(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const searchSpecialists = async (req, res) => {
  const { search } = req.query;

  try {
    const specialists = await User.find({
      $or: [{ isNutri: true }, { isPychologist: true }, { isDoctor: true }],
    })
      .populate({
        path: "dates",
        populate: {
          path: "record",
        },
      })
      .populate("patients");

    const filteredSpecialists = specialists.filter(
      (sp) =>
        sp.firstname.toLowerCase().includes(search.toLowerCase()) ||
        sp.lastname.toLowerCase().includes(search.toLowerCase()) ||
        (sp.firstname.toLowerCase() + " " + sp.lastname.toLowerCase()).includes(
          search.toLowerCase()
        ) ||
        sp.email.toLowerCase().includes(search.toLowerCase())
    );

    res
      .status(200)
      .json({ search: search, status: true, data: filteredSpecialists });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const deletePatientsExcept = async (req, res) => {
  const { user } = req;
  const { exceptIdPatient } = req.body;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const usersToDelete = await User.find({
      $and: [{ _id: { $ne: exceptIdPatient } }, { isPatient: true }],
    });

    if (usersToDelete.length > 0) {
      usersToDelete.forEach(async (user) => {
        const removeSimulation = await SimulationModel.deleteOne({
          idpatient: user._id,
        });
        console.log("removeSimulation", removeSimulation);

        const removeRecord = await Record.deleteOne({ idpatient: user._id });
        console.log("removeRecord", removeRecord);

        const removeDate = await DateModel.deleteOne({ idpatient: user._id });
        console.log("removeDate", removeDate);

        const removeUser = await User.deleteOne({ _id: user._id });
        console.log("removeUser", removeUser);
      });
    }

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

export {
  registerPatients,
  registerDoctors,
  login,
  forgetPassword,
  findoutToken,
  NewPassword,
  getPatients,
  getDateSpecialists,
  getSpecialists,
  registerNutri,
  profile,
  editUsers,
  editProfile,
  getPatient,
  getSpecialist,
  getUsersRecent,
  getUsersRegisterRecent,
  Info,
  registerPsicologist,
  ChangeState,
  sendWarning,
  searchPatients,
  searchSpecialists,
  sendTest,
  deletePatientsExcept,
};

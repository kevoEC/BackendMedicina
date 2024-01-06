import OperationModel from "../models/Operation.js";

const getAllInd = async (req, res) => {
  try {
    const justActive = req.query.justActive;
    if (justActive === "true") {
      const ind = await OperationModel.find({ active: true });
      res.status(200).json({ data: ind, status: true });
    } else {
      const ind = await OperationModel.find();
      res.status(200).json({ data: ind, status: true });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const createInd = async (req, res) => {
  try {
    const newInd = new OperationModel(req.body);
    await newInd.save();
    res.status(200).json({ msg: "Indicacion para Cirugía creada correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const updateInd = async (req, res) => {
  const { id } = req.params;

  try {
    const indExist = await OperationModel.findById(id);
    if (!indExist) {
      const error = new Error("Indicacion no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    indExist.name = req.body.name || indExist.name;
    indExist.active = 'active' in req.body ? req.body.active : indExist.active

    const indStored = await indExist.save();

    res.status(200).json({ msg: indStored, status: true });
  } catch (error) {
    console.log("err", error);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const getInd = async (req, res) => {
  const { id } = req.params;

  try {
    const indExist = await OperationModel.findById(id);
    if (!indExist) {
      const error = new Error("Prueba no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json({ data: indExist, status: true });
  } catch (error) {
    console.log("err", error);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

export { getAllInd, createInd, updateInd, getInd };

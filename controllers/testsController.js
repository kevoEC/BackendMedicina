import TestModel from "../models/Test.js";

const getAllTests = async (req, res) => {
  try {
    const justActive = req.query.justActive;
    if (justActive === "true") {
      const tests = await TestModel.find({ active: true });
      res.status(200).json({ data: tests, status: true });
    } else {
      const tests = await TestModel.find();
      res.status(200).json({ data: tests, status: true });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const createTest = async (req, res) => {
  try {
    const newTest = new TestModel(req.body);
    await newTest.save();
    res.status(200).json({ msg: "Exámen creado correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const updateTest = async (req, res) => {
  const { id } = req.params;

  try {
    const testExist = await TestModel.findById(id);
    if (!testExist) {
      const error = new Error("Prueba no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    testExist.name = req.body.name || testExist.name;
    testExist.active = 'active' in req.body ? req.body.active : testExist.active

    const testStored = await testExist.save();

    res.status(200).json({ msg: testStored, status: true });
  } catch (error) {
    console.log("err", error);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const getTest = async (req, res) => {
  const { id } = req.params;

  try {
    const testExist = await TestModel.findById(id);
    if (!testExist) {
      const error = new Error("Prueba no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json({ data: testExist, status: true });
  } catch (error) {
    console.log("err", error);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

export { getAllTests, createTest, updateTest, getTest };

import mongoose from "mongoose";
import SimulationModel from "../models/Simulations.js";

const simulationsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const simulations = await SimulationModel.find({ idpatient: new mongoose.Types.ObjectId(patientId) });
    let sortedSimulations = []
    if(simulations.length > 0){
      sortedSimulations = simulations.sort((a, b) => b.createdAt - a.createdAt);
    }
    res.status(200).json({ data: sortedSimulations, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const createSimulation = async (req, res) => {
  try {
    const simulation = new SimulationModel(req.body);
    await simulation.save();
    res
      .status(200)
      .json({ msg: "Simulación creada correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

export { createSimulation, simulationsByPatient };
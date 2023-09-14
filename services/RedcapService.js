import CorsiTestResult from "../models/CorsiTestResult";
import TestsNames from "../Helpers/TestsNames";
import CardsTestResult from "../models/CardsTestResult";
import BellsTestResult from "../models/bellsTestResult";
import ColorTrailsTestResult from "../models/ColorTrailsTestResult";
import HanoiTestResult from "../models/HanoiTestResult";
import { Database } from "./Database";
import * as Promise from "bluebird";
import PyramidAndPalmTreesTestResult from "../models/PyramidAndPalmtreesTestResult";
import uuid from "react-native-uuid";

//TODO crear funcion que va a ser llamada cuando se haga click en upload to redcap.
//Esta funcion va a tener que llamar a funciones nuevas (una por cada test) creadas cuyo objetivo es traer todo desde las BD local
//Ver a futuro el tema de eliminacion de registros en BD, si no se van a pisar en redcap
//Ver como llegan los datos y como hacer para formatearlos en JSON
//Tema ID hacer un random ( si no se va a tener que ir a redcap y extraer data para ver el ultimo ID, no tiene sentido)<--- Esto especificarlo en el informe

export default class RedcapService {
  static instance() {
    if (RedcapService._instance) {
      return RedcapService._instance;
    } else {
      RedcapService._instance = new RedcapService();
      return RedcapService._instance;
    }
  }

  constructor() {
    this.corsiResults = []; //Porque corsi results tiene que estar aca ?
    this._db = new Database("test");
  }
  async getHanoiTestResults() {
    try {
      const results = await this._db.execute(`select * from hanoiTest`);
      const data = results.rows.map((record) => {
        const {
          date,
          invalidMovements,
          patientNumber,
          professionalNumber,
          timeElapsed,
          validMovements,
        } = record;
        return {
          id: uuid.v4(),
          date,
          invalidMovements,
          patientNumber,
          professionalNumber,
          timeElapsed,
          validMovements,
        };
      });
      console.log(data);
      //return results.rows;
    } catch (e) {
      console.log(e);
    }
  }
}

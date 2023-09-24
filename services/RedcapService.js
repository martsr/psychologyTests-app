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
import axios from "axios";

//TODO
const API_BASE_URL = "http://18.116.149.64:443/redcap/api/";
//const API_TOKEN_BELLS = "4A91660FE559974433C0DB45306179C0";
const API_TOKEN_HANOI = "9F5789B932F1F065CBB89BF658163E4";
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

  async createJSON(data) {
    console.log("Entre a create JSON");
    const info = data.rows;
    data = {
      token: "B9F5789B932F1F065CBB89BF658163E4",
      content: "record",
      action: "import",
      format: "json",
      type: "flat",
      overwriteBehavior: "normal",
      forceAutoNumber: "true",
      data: info,
      returnContent: "count",
      returnFormat: "json",
    };
    const response = await axios.post(API_BASE_URL, info);
    console.log("API Response", response.data);
  }

  async getHanoiTestResults() {
    try {
      //esto tiene los resultados de la ejecucion de query
      const results = await this._db.execute(`select * from HanoiTest`);
      //llamo a funcion que crea un json y le paso como paramentro results
      //este lo que va a hacer es iterar sobre cada fila y que devuelva un objeto llave valor en el orden que yo quiero
      //despues lo transforo en json, porque como es un .map itera y devuelve un array
      //una vez con el json hacer otra funcion que llame a la api e inserte los valores
      //depende del resultado ver que hacer
      //asegurarse si o si que no haya ningun campo undefined, si el campo es undefined entonces ver que valor poner
      //esto deberia estar afuera, conviene crear otra funcion que se encargue de hacer el llamado de todas las funciones correspondientes

      const hanoi_json = await this.createJSON(results);
      console.log(hanoi_json);
      // const hanoi_results = results.rows.map((record) => {
      //   console.log(record)
      //   if (record != undefined) {
      //     const {
      //       patientNumber,
      //       professionalNumber,
      //       date,
      //       validMovements,
      //       invalidMovements,
      //       timeElapsed,
      //     } = record;
      //     const id = uuid.v4();

      //     return {
      //       id,
      //       patientNumber,
      //       professionalNumber,
      //       date,
      //       validMovements,
      //       invalidMovements,
      //       timeElapsed,
      //     };
      //   }
      // });
      console.log("Esto funciona");
      // console.log(hanoi_results);
      return hanoi_json;
    } catch (e) {
      console.log(e);
    }
  }
}

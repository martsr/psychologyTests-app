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
const API_BASE_URL = "http://18.116.149.64:80/redcap/api/";
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

  async hanoiToRedcap(data) {
    console.log("Entre a create JSON");
    const info = data.rows;
    console.log(info);

    const formData = new FormData();
    formData.append("token", "64A9273BE8E10D638F17EC262D604675");
    formData.append("content", "record");
    formData.append("action", "import");
    formData.append("format", "json");
    formData.append("type", "flat");
    formData.append("overwriteBehavior", "normal");
    formData.append("forceAutoNumber", "true");
    formData.append("data", info);
    formData.append("returnContent", "count");
    formData.append("returnFormat", "json");

    const response = await axios({
      method: "post",
      url: API_BASE_URL,
      data: formData,
    });
    console.log(response.status);
    if (response.status === 200) {
      console.log("Request was successfull");
      console.log("Response Data: ", response.data);
      return true;
    } else {
      console.error("Request failed with status code:", response.status);
      console.error("Response Data:", response.data);
      console.log("Message: ", response.data.error);
      return false;
    }
  }

  async getHanoiTestResults() {
    try {
      //esto tiene los resultados de la ejecucion de query
      //aca se tiene que validar si esta vacia la query o no , si lo esta que no llame a redcap es al pedo.if results.row ==[], entonces que no lo suba
      const results = await this._db.execute(`select * from HanoiTest`);
      //llamo a funcion que crea un json y le paso como paramentro results
      //este lo que va a hacer es iterar sobre cada fila y que devuelva un objeto llave valor en el orden que yo quiero
      //despues lo transforo en json, porque como es un .map itera y devuelve un array
      //una vez con el json hacer otra funcion que llame a la api e inserte los valores
      //depende del resultado ver que hacer
      //asegurarse si o si que no haya ningun campo undefined, si el campo es undefined entonces ver que valor poner
      //esto deberia estar afuera, conviene crear otra funcion que se encargue de hacer el llamado de todas las funciones correspondientes
      //renombrar funcion como upload to redcap o algo asi

      const hanoi_result = await this.hanoiToRedcap(results);
      console.log(hanoi_result);
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

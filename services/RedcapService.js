import React from "react";
import { Modal } from "react-native";
import { Database } from "./Database";
import axios from "axios";
import SuccessfulUpdate from "../components/SuccessfulUpdate";

//TODO
const API_BASE_URL = "http://18.116.149.64:80/redcap/api/";
//const API_TOKEN_BELLS = "4A91660FE559974433C0DB45306179C0";
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
    // const dataObj = data.rows.map((record) => {
    //   const { date, professional_number, patient_number } = record;
    //   record.id =
    //     date.slice(0, 10) + "-" + professional_number + "-" + patient_number;
    //   return record;
    // });
    const info = JSON.stringify(data.rows);
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
    try {
      const response = await axios({
        method: "post",
        url: "http://18.116.149.64:80/redcap/api/",
        data: formData,
      });

      if (response.status === 200) {
        console.log("Request was successfull, with status 200");
        console.log("Response Data: ", response.data);
        //await this._db.execute(`delete from HanoiTest`);
        return true;
      } else {
        console.error("Request failed with status code:", response.status);
        console.error("Response Data:", response.data);
        console.log("Message: ", response.data.error);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  }

  async getTestResults() {
    try {
      //esto tiene los resultados de la ejecucion de query
      //aca se tiene que validar si esta vacia la query o no , si lo esta que no llame a redcap es al pedo.if results.row ==[], entonces que no lo suba
      const results = await this._db.execute(`select * from HanoiTest`);
      if (results.rows.length == 0)
        return "Hanoi Test table is empty no tests were uploaded to DB";
      else {
        //console.log("RESULTS: ", results.rows);
        //llamo a funcion que crea un json y le paso como paramentro results
        //este lo que va a hacer es iterar sobre cada fila y que devuelva un objeto llave valor en el orden que yo quiero
        //despues lo transforo en json, porque como es un .map itera y devuelve un array
        //una vez con el json hacer otra funcion que llame a la api e inserte los valores
        //depende del resultado ver que hacer
        //asegurarse si o si que no haya ningun campo undefined, si el campo es undefined entonces ver que valor poner
        //esto deberia estar afuera, conviene crear otra funcion que se encargue de hacer el llamado de todas las funciones correspondientes
        //renombrar funcion como upload to redcap o algo asi

        const hanoi_result = await this.hanoiToRedcap(results);
        if (hanoi_result) return true;
        // console.log(hanoi_results);
        //return hanoi_json;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

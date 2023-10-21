import { Database } from "./Database";
import axios from "axios";

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
    this.corsiResults = [];
    this._db = new Database("test");
  }
  async uploadResults(dataObj, token) {
    console.log("Entre a Upload: ", dataObj, token);
    const info = JSON.stringify(dataObj);
    console.log(info);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("content", "record");
    formData.append("action", "import");
    formData.append("format", "json");
    formData.append("type", "flat");
    formData.append("overwriteBehavior", "normal");
    formData.append("forceAutoNumber", "false");
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
        return true;
      } else {
        return 400;
      }
    } catch (error) {
      console.error("Request failed with status code:", response.status);
      console.error("Response Data:", response.data);
      console.log("Message: ", response.data.error);
      console.error("Error:", error.response.data.error);
    }
  }

  async hanoiToRedcap(data) {
    token = "64A9273BE8E10D638F17EC262D604675";
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number } = record;
      newId =
        date.slice(0, 10) + "-" + professional_number + "-" + patient_number;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from HanoiTest where id=?`, [record.id]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async bellsToRedcap(data) {
    token = "2E539EE9F446B883979F4138C3C2715B";
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number, bells } = record;
      newId =
        date.slice(0, 10) +
        "-" +
        professional_number +
        "-" +
        patient_number +
        "-" +
        bells;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from bellsTest where id=?`, [record.id]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async corsiToRedcap(data) {
    token = "3842E0C5FE25BFD62527A917D59F2DCC";
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number, id } = record;
      newId =
        date.slice(0, 10) +
        "-" +
        professional_number +
        "-" +
        patient_number +
        "-" +
        id;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from corsiTest where id=?`, [record.id]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async cardsToRedcap(data) {
    token = "37408C840BED324243CE3089EDD8B0AF";
    console.log(data.rows);
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number, round } = record;
      newId =
        date.slice(0, 10) +
        "-" +
        professional_number +
        "-" +
        patient_number +
        "-" +
        round;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from cardsTest where id=?`, [record.id]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async colorTrailsToRedcap(data) {
    token = "28CACD4CEF1F5CC19A60D7677C6C0640";
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number } = record;
      newId =
        date.slice(0, 10) + "-" + professional_number + "-" + patient_number;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from ColorTrailsTest where id=?`, [record.id]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async pyramidsToRedcap(data) {
    token = "6299C4D500781B0EF86B5885CE805E36";
    const dataObj = data.rows.map((record) => {
      const { date, professional_number, patient_number, test_name } = record;
      newId =
        date.slice(0, 10) +
        "-" +
        professional_number +
        "-" +
        patient_number +
        "-" +
        test_name;
      const isDuplicate = data.rows.some(
        (otherRecord) => otherRecord.id === newId
      );
      if (isDuplicate) {
        this._db.execute(`delete from pyramidsAndPalmtreesTest where id=?`, [
          record.id,
        ]);
        return;
      }
      record.id = newId;
      return record;
    });

    return await this.uploadResults(dataObj, token);
  }

  async getTestResults() {
    try {
      const hanoiData = await this._db.execute(`select * from HanoiTest`);
      const bellsData = await this._db.execute(`select * from bellsTest`);
      const corsiData = await this._db.execute(`select * from corsiTest`);
      const cardsData = await this._db.execute(`select * from cardsTest`);
      const colorTrailsData = await this._db.execute(
        `select * from ColorTrailsTest`
      );
      const pyramidsData = await this._db.execute(
        `select * from pyramidsAndPalmtreesTest`
      );

      if (
        hanoiData.rows.length == 0 &&
        bellsData.rows.length == 0 &&
        corsiData.rows.length == 0 &&
        cardsData.rows.length == 0 &&
        colorTrailsData.rows.length == 0 &&
        pyramidsData.rows.length == 0
      )
        return false;
      if (hanoiData.rows.length !== 0) {
        const hanoiResults = await this.hanoiToRedcap(hanoiData);
        if (hanoiResults) await this._db.execute(`delete from HanoiTest`);
      }
      if (bellsData.rows.length !== 0) {
        const bellsResults = await this.bellsToRedcap(bellsData);
        if (bellsResults) await this._db.execute(`delete from bellsTest`);
      }

      if (corsiData.rows.length !== 0) {
        const corsiResults = await this.corsiToRedcap(corsiData);
        if (corsiResults) await this._db.execute(`delete from corsiTest`);
      }

      if (cardsData.rows.length !== 0) {
        const cardsResults = await this.cardsToRedcap(cardsData);
        if (cardsResults) await this._db.execute(`delete from cardsTest`);
      }

      if (colorTrailsData.rows.length !== 0) {
        const colorTrailsResults = await this.colorTrailsToRedcap(
          colorTrailsData
        );
        if (colorTrailsResults)
          await this._db.execute(`delete from ColorTrailsTest`);
      }

      if (pyramidsData.rows.length !== 0) {
        const pyramidsResults = await this.pyramidsToRedcap(pyramidsData);
        if (pyramidsResults)
          await this._db.execute(`delete from pyramidsAndPalmtreesTest`);
      }

      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

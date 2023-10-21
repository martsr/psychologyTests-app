import CorsiTestResult from "../models/CorsiTestResult";
import TestsNames from "../Helpers/TestsNames";
import CardsTestResult from "../models/CardsTestResult";
import BellsTestResult from "../models/bellsTestResult";
import ColorTrailsTestResult from "../models/ColorTrailsTestResult";
import HanoiTestResult from "../models/HanoiTestResult";
import { Database } from "./Database";
import * as Promise from "bluebird";
import PyramidAndPalmTreesTestResult from "../models/PyramidAndPalmtreesTestResult";

export default class DatabaseService {
  static instance() {
    if (DatabaseService._instance) {
      return DatabaseService._instance;
    } else {
      DatabaseService._instance = new DatabaseService();
      return DatabaseService._instance;
    }
  }

  constructor() {
    this.corsiResults = [];
    this._db = new Database("test");
  }

  async saveCorsiTestResult(patientNumber, interviewerNumber, corsiResult) {
    const testResult = new CorsiTestResult(
      patientNumber,
      interviewerNumber,
      new Date(),
      corsiResult
    );
    await this.createCorsiTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async savePyramidsAndPalmtreesTestResult(
    patientNumber,
    interviewerNumber,
    result
  ) {
    const testResult = new PyramidAndPalmTreesTestResult(
      patientNumber,
      interviewerNumber,
      new Date(),
      result
    );
    await this.createPyramidsAndPalmtreesTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async saveCardsTestResult(patientNumber, professionalNumber, cardsResult) {
    const testResult = new CardsTestResult(
      patientNumber,
      professionalNumber,
      new Date(),
      cardsResult
    );
    await this.createCardsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async saveBellsTestResult(patientNumber, professionalNumber, bellsResult) {
    const testResult = new BellsTestResult(
      patientNumber,
      professionalNumber,
      new Date(),
      bellsResult
    );
    await this.createBellsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async createCorsiTable() {
    await this._db.execute(`create table if not exists corsiTest (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      inverted text,
      amount_of_boxes number,
      correct text,
      time_in_ms number);`);
  }

  async createPyramidsAndPalmtreesTable() {
    await this._db
      .execute(`create table if not exists pyramidsAndPalmtreesTest (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      test_name text,
      time_spend number,
      is_correct text,
      is_animated text);`);
  }

  async createCardsTable() {
    await this._db.execute(`create table if not exists cardsTest (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      criteria text,
      catch_persistence number,
      mistake_persistence number,
      round number,
      event text,
      time_in_ms number);`);
  }

  async createBellsTable() {
    await this._db.execute(`create table if not exists bellsTest  (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      bells number,
      mistakes number,
      omision_mistakes number,
      time_in_ms number,
      time_in_s real);`);
  }

  async getCorsiTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createCorsiTable();
    const dbResults = await this._db.execute(`select * from corsiTest`);
    const header =
      "patient_number,professional_number,date,inverted,amount_of_boxes,correct,time_in_ms\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.inverted},${row.amountOfBoxes},${row.correct},${row.timeInMs}\n`;
      })
      .join("");
    return `${header}${data}`;
  }

  rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber) {
    return (row) => {
      return (
        fromDate <= new Date(row.date) &&
        toDate >= new Date(row.date) &&
        (!patientNumber ||
          patientNumber.toLowerCase() == row.patientNumber.toLowerCase())
      );
    };
  }

  async getPyramidTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createPyramidsAndPalmtreesTable();
    const dbResults = await this._db.execute(
      `select * from pyramidsAndPalmtreesTest`
    );
    const header =
      "patient_number,professional_number,date,test_name,time_spend,is_correct,is_animated\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.testName},${row.timeSpend},${row.isCorrect},${row.isAnimated}\n`;
      })
      .join("");

    console.log("&&&&&&&&&&&&&&& DATA: ", data);
    return `${header}${data}`;
  }

  async getCardsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createCardsTable();
    const dbResults = await this._db.execute(`select * from cardsTest`);
    const header =
      "patient_number,professional_number,date,criteria,catch_persistence,mistake_persistence,round,event,time_in_ms\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.criteria},${row.catchPersistence},${row.mistakePersistence},${row.round},${row.event},${row.timeInMs}\n`;
      })
      .join("");
    return `${header}${data}`;
  }

  async getBellsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createBellsTable();
    const dbResults = await this._db.execute(`select * from bellsTest`);
    const header =
      "patient_number,professional_number,date,bells,mistakes,omision_mistakes,time_in_ms,time_in_s\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.bells},${row.mistakes},${row.omisionMistakes},${row.timeInMs},${row.timeInS}\n`;
      })
      .join("");
    return `${header}${data}`;
  }

  async getCSVResults(test, fromDate, toDate, patientNumber) {
    console.log("estoy en getCSVResults");
    switch (test) {
      case TestsNames.corsiTest:
        return this.getCorsiTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.pyramidAndPalmTreesTest:
        return this.getPyramidTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.cardTest:
        return this.getCardsTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.bellTest:
        return this.getBellsTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.colorTrailsTest:
        return this.getColorTrailsTestCSVResults(
          fromDate,
          toDate,
          patientNumber
        );
      case TestsNames.hanoiTest:
        return this.getHanoiTestCSVResults(fromDate, toDate, patientNumber);
      default:
        throw new Error("Selecciona un test");
    }
  }

  async createColorTrailsTable() {
    await this._db.execute(`create table if not exists ColorTrailsTest (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      path_length number,
      valid_movements number,
      invalid_movements text,
      time_elapsed number);`);
  }

  async saveColorTrailsTestResult(
    patientNumber,
    professionalNumber,
    colorTrailsResult
  ) {
    const testResult = new ColorTrailsTestResult(
      patientNumber,
      professionalNumber,
      new Date(),
      colorTrailsResult
    );
    await this.createColorTrailsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async getColorTrailsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createColorTrailsTable();
    const dbResults = await this._db.execute(`select * from ColorTrailsTest`);
    const header =
      "patient_number,professional_number,date,path_length,valid_movements,invalid_movements,time_elapsed\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.pathLength},${row.validMovements},${row.invalidMovements},${row.timeElapsed}\n`;
      })
      .join("");
    return `${header}${data}`;
  }

  async createHanoiTestTable() {
    await this._db.execute(`create table if not exists HanoiTest (
      id integer primary key not null, 
      patient_number text,
      professional_number text,
      date text,
      valid_movements number,
      invalid_movements number,
      time_elapsed number);`);
  }

  async saveHanoiTestResult(patientNumber, professionalNumber, hanoiResult) {
    const testResult = new HanoiTestResult(
      patientNumber,
      professionalNumber,
      new Date(),
      hanoiResult
    );
    await this.createHanoiTestTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async getHanoiTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createHanoiTestTable();
    const dbResults = await this._db.execute(`select * from HanoiTest`);
    const header =
      "patient_number,professional_number,date,valid_movements,invalid_movements,time_elapsed\n";
    const data = dbResults.rows
      .filter(
        this.rowOfPatientNumberIfAnyAndBetweenDates(
          fromDate,
          toDate,
          patientNumber
        )
      )
      .map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.pathLength},${row.validMovements},${row.invalidMovements},${row.timeElapsed}\n`;
      })
      .join("");
    return `${header}${data}`;
  }
}

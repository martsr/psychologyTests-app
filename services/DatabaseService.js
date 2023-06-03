import CorsiTestResult from "../models/CorsiTestResult";
import TestsNames from "../Helpers/TestsNames";
import CardsTestResult from "../models/CardsTestResult";
import BellsTestResult from "../models/bellsTestResult";
import ColorTrailsTestResult from "../models/ColorTrailsTestResult";
import HanoiTestResult from "../models/HanoiTestResult";
import { Database } from "./Database";
import * as Promise from "bluebird"
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
    this._db = new Database('test');
  }

  async saveCorsiTestResult(patientNumber, interviewerNumber, corsiResult) {
    const testResult = new CorsiTestResult(patientNumber, interviewerNumber, new Date(), corsiResult);
    await this.createCorsiTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }


  async savePyramidsAndPalmtreesTestResult(patientNumber, interviewerNumber, result) {
    const testResult = new PyramidAndPalmTreesTestResult(patientNumber, interviewerNumber, new Date(), result);
    await this.createPyramidsAndPalmtreesTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async saveCardsTestResult(patientNumber, professionalNumber,cardsResult) {
    const testResult = new CardsTestResult(patientNumber, professionalNumber, new Date(), cardsResult);
    await this.createCardsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async saveBellsTestResult(patientNumber, professionalNumber,bellsResult) {
    const testResult = new BellsTestResult(patientNumber, professionalNumber, new Date(), bellsResult);
    await this.createBellsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async createCorsiTable() {
    await this._db.execute(`create table if not exists corsiTest (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      inverted text,
      amountOfBoxes number,
      correct text,
      timeInMs number);`);
  }

  async createPyramidsAndPalmtreesTable() {
    await this._db.execute(`create table if not exists pyramidsAndPalmtreesTest (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      testName text,
      timeSpend number,
      isCorrect text,
      isAnimated text);`);
  }

  async createCardsTable() {
    await this._db.execute(`create table if not exists cardsTest (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      criteria text,
      catchPersistence number,
      mistakePersistence number,
      round number,
      event text,
      timeInMs number);`);
  }

  async createBellsTable() {
    await this._db.execute(`create table if not exists bellsTest  (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      bells number,
      mistakes number,
      omisionMistakes number,
      timeInMs number,
      timeInS real);`);
  }

  async getCorsiTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createCorsiTable();
    const dbResults = await this._db.execute(`select * from corsiTest`);
    const header = 'patientNumber,professionalNumber,date,inverted,amountOfBoxes,correct,timeInMs\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.inverted},${row.amountOfBoxes},${row.correct},${row.timeInMs}\n`
    }).join('');
    return `${header}${data}`;
  }

  rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber) {
    return (row) => {
      return (fromDate <= new Date(row.date) && toDate >= new Date(row.date))
        && (!patientNumber || patientNumber.toLowerCase() == row.patientNumber.toLowerCase());
    };
  }

  async getPyramidTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createPyramidsAndPalmtreesTable();
    const dbResults = await this._db.execute(`select * from pyramidsAndPalmtreesTest`);
    const header = 'patientNumber,professionalNumber,date,testName,timeSpend,isCorrect,isAnimated\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.testName},${row.timeSpend},${row.isCorrect},${row.isAnimated}\n`
    }).join('');

    console.log("&&&&&&&&&&&&&&& DATA: ", data)
    return `${header}${data}`;
  }

  async getCardsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createCardsTable();
    const dbResults = await this._db.execute(`select * from cardsTest`);
    const header = 'patientNumber,professionalNumber,date,criteria,catchPersistence,mistakePersistence,round,event,timeInMs\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.criteria},${row.catchPersistence},${row.mistakePersistence},${row.round},${row.event},${row.timeInMs}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getBellsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createBellsTable();
    const dbResults = await this._db.execute(`select * from bellsTest`);
    const header = 'patientNumber,professionalNumber,date,bells,mistakes,omisionMistakes,timeInMs,timeInS\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.bells},${row.mistakes},${row.omisionMistakes},${row.timeInMs},${row.timeInS}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getCSVResults(test, fromDate, toDate, patientNumber) {
    console.log('estoy en getCSVResults')
    switch(test){
      case TestsNames.corsiTest:
        return this.getCorsiTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.pyramidAndPalmTreesTest:
        return this.getPyramidTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.cardTest:
        return this.getCardsTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.bellTest:
        return this.getBellsTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.colorTrailsTest:
        return this.getColorTrailsTestCSVResults(fromDate, toDate, patientNumber);
      case TestsNames.hanoiTest:
        return this.getHanoiTestCSVResults(fromDate, toDate, patientNumber);
      default:
        throw new Error('Selecciona un test');
    }
  }

  async createColorTrailsTable() {
    await this._db.execute(`create table if not exists ColorTrailsTest (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      pathLength number,
      validMovements number,
      invalidMovements text,
      timeElapsed number);`);
  }

  async saveColorTrailsTestResult(patientNumber, professionalNumber, colorTrailsResult) {
    const testResult = new ColorTrailsTestResult(patientNumber, professionalNumber, new Date(), colorTrailsResult);
    await this.createColorTrailsTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async getColorTrailsTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createColorTrailsTable();
    const dbResults = await this._db.execute(`select * from ColorTrailsTest`);
    const header = 'patientNumber,professionalNumber,date,pathLength,validMovements,invalidMovements,timeElapsed\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.pathLength},${row.validMovements},${row.invalidMovements},${row.timeElapsed}\n`
    }).join('');
    return `${header}${data}`;
  }

  async createHanoiTestTable() {
    await this._db.execute(`create table if not exists HanoiTest (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      validMovements number,
      invalidMovements number,
      timeElapsed number);`);
  }

  async saveHanoiTestResult(patientNumber, professionalNumber, hanoiResult) {
    const testResult = new HanoiTestResult(patientNumber, professionalNumber, new Date(), hanoiResult);
    await this.createHanoiTestTable();
    Promise.each(testResult.rows(), async (row) => {
      await this._db.execute(row.sqlInsertText());
    });
  }

  async getHanoiTestCSVResults(fromDate, toDate, patientNumber) {
    await this.createHanoiTestTable();
    const dbResults = await this._db.execute(`select * from HanoiTest`);
    const header = 'patientNumber,professionalNumber,date,validMovements,invalidMovements,timeElapsed\n';
    const data = dbResults.rows.
    filter(this.rowOfPatientNumberIfAnyAndBetweenDates(fromDate, toDate, patientNumber)).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.pathLength},${row.validMovements},${row.invalidMovements},${row.timeElapsed}\n`
    }).join('');
    return `${header}${data}`;
  }
}
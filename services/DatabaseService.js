import CorsiTestResult from "../models/CorsiTestResult";
import TestsNames from "../Helpers/TestsNames";
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

  async getCorsiTestCSVResults(fromDate, toDate) {
    await this.createCorsiTable();
    const dbResults = await this._db.execute(`select * from corsiTest`);
    const header = 'patientNumber,professionalNumber,date,inverted,amountOfBoxes,correct,timeInMs\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('ROW: filter:',fromDate <= new Date(row.date) && toDate >= new Date(row.date), row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.inverted},${row.amountOfBoxes},${row.correct},${row.timeInMs}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getPyramidTestCSVResults(fromDate, toDate) {
    await this.createPyramidsAndPalmtreesTable();
    const dbResults = await this._db.execute(`select * from pyramidsAndPalmtreesTest`);
    const header = 'patientNumber,professionalNumber,date,testName,timeSpend,isCorrect,isAnimated\n';
    const data = dbResults.rows.
    filter((row) => {
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.testName},${row.timeSpend},${row.isCorrect},${row.isAnimated}\n`
    }).join('');

    console.log("&&&&&&&&&&&&&&& DATA: ", data)
    return `${header}${data}`;
  }

  async getCSVResults(test, fromDate, toDate) {
    console.log('estoy en getCSVResults')
    switch(test){
      case TestsNames.corsiTest:
        return this.getCorsiTestCSVResults(fromDate, toDate);
      case TestsNames.pyramidAndPalmTreesTest:
        return this.getPyramidTestCSVResults(fromDate, toDate);
      default:
        throw new Error('Selecciona un test');
    }
  }

}
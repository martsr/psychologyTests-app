import CorsiTestResult from "../models/CorsiTestResult";
import ColorTrailsTestResult from "../models/ColorTrailsTestResult";
import HanoiTestResult from "../models/HanoiTestResult";
import { Database } from "./Database";
import * as Promise from "bluebird"

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

  async saveCorsiTestResult(patientNumber, corsiResult) {
    const testResult = new CorsiTestResult(patientNumber, 0, new Date(), corsiResult);
    await this.createCorsiTable();
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

  async getCorsiTestCSVResults(fromDate, toDate) {
    await this.createCorsiTable();
    const dbResults = await this._db.execute(`select * from corsiTest`);
    const header = 'patientNumber,professionalNumber,date,inverted,amountOfBoxes,correct,timeInMs\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('row', row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.inverted},${row.amountOfBoxes},${row.correct},${row.timeInMs}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getCSVResults(test, fromDate, toDate) {
    if (test == 'corsi') {
      return this.getCorsiTestCSVResults(fromDate, toDate);
    } else if (test == 'piramides') {
      return this.getCorsiTestCSVResults(fromDate, toDate);
    } else if (test == 'color'){
      return this.getColorTrailsTestCSVResults(fromDate, toDate);
    } else if (test == 'hanoi'){
      return this.getColorTrailsTestCSVResults(fromDate, toDate);
    } else {
      throw new Error('No existe el test');
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

  async getColorTrailsTestCSVResults(fromDate, toDate) {
    await this.createColorTrailsTable();
    const dbResults = await this._db.execute(`select * from ColorTrailsTest`);
    const header = 'patientNumber,professionalNumber,date,pathLength,validMovements,invalidMovements,timeElapsed\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('row', row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
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

  async getHanoiTestCSVResults(fromDate, toDate) {
    await this.createColorTrailsTable();
    const dbResults = await this._db.execute(`select * from HanoiTest`);
    const header = 'patientNumber,professionalNumber,date,validMovements,invalidMovements,timeElapsed\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('row', row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.pathLength},${row.validMovements},${row.invalidMovements},${row.timeElapsed}\n`
    }).join('');
    return `${header}${data}`;
  }
}
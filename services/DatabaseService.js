import CorsiTestResult from "../models/CorsiTestResult";
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

  async getCorsiTestResults() {
    await this.createCorsiTable();
    return this._db.execute(`select * from corsiTest`);
  }

  async getResults() {
    return {
      corsiTest: await this.getCorsiTestResults(),
    }
  }


}
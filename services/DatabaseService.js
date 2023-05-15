import CorsiTestResult from "../models/CorsiTestResult";
import CardsTestResult from "../models/CardsTestResult";
import BellsTestResult from "../models/bellsTestResult";
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
/* drop table if exists bellsTest; */
  async createBellsTable() {
    await this._db.execute(`create table if not exists bellsTest  (
      id integer primary key not null, 
      patientNumber text,
      professionalNumber text,
      date text,
      bells number,
      mistakes number,
      timeInMs number,
      timeInS real);`);
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

  async getCardsTestCSVResults(fromDate, toDate) {
    await this.createCardsTable();
    const dbResults = await this._db.execute(`select * from cardsTest`);
    const header = 'patientNumber,professionalNumber,date,criteria,catchPersistence,mistakePersistence,round,event,timeInMs\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('row', row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.criteria},${row.catchPersistence},${row.mistakePersistence},${row.round},${row.event},${row.timeInMs}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getBellsTestCSVResults(fromDate, toDate) {
    await this.createBellsTable();
    const dbResults = await this._db.execute(`select * from bellsTest`);
    const header = 'patientNumber,professionalNumber,date,bells,mistakes,timeInMs,timeInS\n';
    const data = dbResults.rows.
    filter((row) => {
      console.log('row', row)
      return fromDate <= new Date(row.date) && toDate >= new Date(row.date);
    }).
    map((row) => {
      return `${row.patientNumber},${row.professionalNumber},${row.date},${row.bells},${row.mistakes},${row.timeInMs},${row.timeInS}\n`
    }).join('');
    return `${header}${data}`;
  }

  async getCSVResults(test, fromDate, toDate) {
    if (test == 'corsi') {
      return this.getCorsiTestCSVResults(fromDate, toDate);
    } else if (test == 'piramides') {
      return this.getCorsiTestCSVResults(fromDate, toDate);
    } else if (test == 'cartas') {
      return this.getCardsTestCSVResults(fromDate, toDate);
    }
    else if (test == 'campanas') {
      return this.getBellsTestCSVResults(fromDate, toDate);
    }
    else {
      throw new Error('No existe el test');
    }
  }



}
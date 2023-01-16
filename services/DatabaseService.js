import TestResult from "../models/TestResult";

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
  }

  saveCorsiTestResult(patientNumber, corsiResult) {
    this.corsiResults.push(new TestResult(patientNumber, new Date(), corsiResult));
  }

  getCorsiTestResults() {
    return this.corsiResults;
  }

  getResults() {
    return {
      corsiTest: this.getCorsiTestResults(),
    }
  }


}
import CorsiTestRow from "./CorsiTestRow";
import TestResult from "./TestResult"

export default class CorsiTestResult extends TestResult {
  constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
    super(aPatientNumber, aProfessionalNumber, aDate, aResult);
  }

  rows() {
    return this.result.map((resultItem) => {
      return new CorsiTestRow(
        this.patientNumber, 
        this.professionalNumber, 
        this.date, 
        resultItem.inverted, 
        resultItem.amountOfBoxes,
        resultItem.correct,
        resultItem.timeInMs,
      );
    });
  }
}
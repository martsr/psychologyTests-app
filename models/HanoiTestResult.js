import HanoiTestRow from "./HanoiTestRow";
import TestResult from "./TestResult";

export default class HanoiTestResult extends TestResult {
  constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
    super(aPatientNumber, aProfessionalNumber, aDate, aResult);
  }

  rows() {
    return this.result.map((resultItem) => {
      return new HanoiTestRow(
        this.patientNumber,
        this.professionalNumber,
        this.date,
        resultItem.validMovements,
        resultItem.invalidMovements,
        resultItem.timeElapsed
      );
    });
  }
}

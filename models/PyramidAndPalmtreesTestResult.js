import PyramidAndPalmtreesTestRow from "./PyramidAndPalmtreesTestRow";
import TestResult from "./TestResult"

export default class PyramidAndPalmTreesTestResult extends TestResult {
  constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
    super(aPatientNumber, aProfessionalNumber, aDate, aResult);
  }

  rows() {
    return this.result.map((resultItem) => {
      return new PyramidAndPalmtreesTestRow(
        this.patientNumber, 
        this.professionalNumber, 
        this.date, 
        resultItem.testName, 
        resultItem.timeSpend,
        resultItem.isCorrect,
        resultItem.isAnimated,
      );
    });
  }
}
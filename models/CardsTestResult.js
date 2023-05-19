import CardsTestRow from "./CardsTestRow";
import TestResult from "./TestResult"

export default class CardsTestResult extends TestResult {
  constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
    super(aPatientNumber, aProfessionalNumber, aDate, aResult);
  }

  rows() {
    return this.result.map((resultItem) => {
      return new CardsTestRow(
        this.patientNumber, 
        this.professionalNumber, 
        this.date, 
        resultItem.criterio,
        resultItem.catchPersistence,
        resultItem.mistakePersistence,
        resultItem.round,
        resultItem.event,
        resultItem.Time
      );
    });
  }
}
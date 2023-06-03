import BellsTestRow from './bellsTestRow';
import TestResult from "./TestResult"

export default class BellsTestResult extends TestResult {
    constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
        super(aPatientNumber, aProfessionalNumber, aDate, aResult);
    }
    
    rows() {
        return this.result.map((resultItem) => {
        return new BellsTestRow(
            this.patientNumber, 
            this.professionalNumber,
            this.date, 
            resultItem.bells,
            resultItem.mistakes,
            resultItem.omisionMistakes,
            resultItem.timeInMs,
            resultItem.timeInS
        );
        });
    }
    }
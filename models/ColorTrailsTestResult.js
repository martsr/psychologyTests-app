import ColorTrailsTestRow from "./ColorTrailsTestRow"
import TestResult from "./TestResult"

export default class ColorTrailsTestResult extends TestResult {
    constructor(aPatientNumber, aProfessionalNumber, aDate, aResult) {
        super(aPatientNumber, aProfessionalNumber, aDate, aResult);
    }

    rows(){
        return this.result.map((resultItem) => {
            return new ColorTrailsTestRow(
                this.patientNumber, 
                this.professionalNumber, 
                this.date,
                resultItem.pathLength,
                resultItem.validMovements,
                resultItem.invalidMovements,
                resultItem.timeElapsed,
            );
        });
    }
}
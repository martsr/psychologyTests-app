export default class ColorTrailsTestRow {
    constructor(
        aPatientNumber,
        aProfessionalNumber,
        aDate,
        pathLength,
        validMovements,
        invalidMovements,
        timeElapsed,) {
            this.patientNumber = aPatientNumber;
            this.professionalNumber = aProfessionalNumber;
            this.date = aDate;
            this.pathLength = pathLength;
            this.validMovements = validMovements;
            this.invalidMovements = invalidMovements;
            this.timeElapsed = timeElapsed;
        }

        sqlInsertText() {
            return `insert into ColorTrailsTest(
                        patientNumber,
                        professionalNumber,
                        date,
                        pathLength,
                        validMovements,
                        invalidMovements,
                        timeElapsed)
                    values (
                        '${this.patientNumber}',
                        '${this.professionalNumber}',
                        '${this.date.toISOString()}',
                        ${this.pathLength},
                        ${this.validMovements},
                        '${this.invalidMovements}',
                        ${this.timeElapsed}
                    );`
        }
}
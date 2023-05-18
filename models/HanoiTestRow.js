export default class HanoiTestRow {
    constructor(
        aPatientNumber,
        aProfessionalNumber,
        aDate,
        validMovements,
        invalidMovements,
        timeElapsed,) {
            this.patientNumber = aPatientNumber;
            this.professionalNumber = aProfessionalNumber;
            this.date = aDate;
            this.validMovements = validMovements;
            this.invalidMovements = invalidMovements;
            this.timeElapsed = timeElapsed;
        }

        sqlInsertText() {
            return `insert into HanoiTest(
                        patientNumber,
                        professionalNumber,
                        date,
                        validMovements,
                        invalidMovements,
                        timeElapsed)
                    values (
                        '${this.patientNumber}',
                        '${this.professionalNumber}',
                        '${this.date.toISOString()}',
                        ${this.validMovements},
                        ${this.invalidMovements},
                        ${this.timeElapsed}
                    );`
        }
}
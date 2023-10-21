export default class ColorTrailsTestRow {
  constructor(
    aPatientNumber,
    aProfessionalNumber,
    aDate,
    pathLength,
    validMovements,
    invalidMovements,
    timeElapsed
  ) {
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
                        patient_number,
                        professional_number,
                        date,
                        path_length,
                        valid_movements,
                        invalid_movements,
                        time_elapsed)
                    values (
                        '${this.patientNumber}',
                        '${this.professionalNumber}',
                        '${this.date.toISOString()}',
                        ${this.pathLength},
                        ${this.validMovements},
                        '${this.invalidMovements}',
                        ${this.timeElapsed}
                    );`;
  }
}

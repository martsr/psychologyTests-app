export default class PyramidAndPalmtreesTestRow {
  constructor(
    aPatientNumber,
    aProfessionalNumber,
    aDate,
    testName,
    timeSpend,
    isCorrect,
    isAnimated
  ) {
    this.patientNumber = aPatientNumber;
    this.professionalNumber = aProfessionalNumber;
    this.date = aDate;
    this.testName = testName;
    this.timeSpend = timeSpend;
    this.isCorrect = isCorrect;
    this.isAnimated = isAnimated;
  }

  sqlInsertText() {
    return `insert into pyramidsAndPalmtreesTest (
                  patient_number,
                  professional_number,
                  date,
                  test_name,
                  time_spend,
                  is_correct,
                  is_animated) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.testName}',
                  ${this.timeSpend},
                  '${this.isCorrect}',
                  ${this.isAnimated}
                );`;
  }
}

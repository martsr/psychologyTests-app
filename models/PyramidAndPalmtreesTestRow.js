export default class PyramidAndPalmtreesTestRow {
    constructor(
      aPatientNumber, 
      aProfessionalNumber, 
      aDate, 
      testName,
      timeSpend,
      isCorrect,
      isAnimated) {
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
                  patientNumber,
                  professionalNumber,
                  date,
                  testName,
                  timeSpend,
                  isCorrect,
                  isAnimated) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.testName}',
                  ${this.timeSpend},
                  '${this.isCorrect}',
                  ${this.isAnimated}
                );`
      }
  }
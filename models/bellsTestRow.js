export default class BellsTestRow {
    constructor(
      aPatientNumber, 
      aProfessionalNumber, 
      aDate, 
      bells,
      mistakes,
      timeInMs,
      timeInS) {
        this.patientNumber = aPatientNumber;
        this.professionalNumber = aProfessionalNumber; 
        this.date = aDate; 
        this.bells = bells;
        this.mistakes = mistakes;
        this.timeInMs = timeInMs;
        this.timeInS = timeInS;
      }
  
      sqlInsertText() {
        return `insert into bellsTest (
                  patientNumber,
                  professionalNumber,
                  date,
                  bells,
                  mistakes,
                  timeInMs,
                  timeInS) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.bells}',
                  '${this.mistakes}',
                  ${this.timeInMs},
                  ${this.timeInS}
                );`
      }
  }
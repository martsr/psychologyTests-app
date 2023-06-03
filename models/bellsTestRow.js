export default class BellsTestRow {
    constructor(
      aPatientNumber, 
      aProfessionalNumber, 
      aDate, 
      bells,
      mistakes,
      omisionMistakes,
      timeInMs,
      timeInS) {
        this.patientNumber = aPatientNumber;
        this.professionalNumber = aProfessionalNumber; 
        this.date = aDate; 
        this.bells = bells;
        this.mistakes = mistakes;
        this.omisionMistakes = omisionMistakes;
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
                  omisionMistakes,
                  timeInMs,
                  timeInS) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.bells}',
                  '${this.mistakes}',
                  '${this.omisionMistakes}',
                  ${this.timeInMs},
                  ${this.timeInS}
                );`
      }
  }
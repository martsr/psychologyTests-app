export default class BellsTestRow {
  constructor(
    aPatientNumber,
    aProfessionalNumber,
    aDate,
    bells,
    mistakes,
    omisionMistakes,
    timeInMs,
    timeInS
  ) {
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
                  patient_number,
                  professional_number,
                  date,
                  bells,
                  mistakes,
                  omision_mistakes,
                  time_in_ms,
                  time_in_s) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.bells}',
                  '${this.mistakes}',
                  '${this.omisionMistakes}',
                  ${this.timeInMs},
                  ${this.timeInS}
                );`;
  }
}

export default class CorsiTestRow {
  constructor(
    aPatientNumber,
    aProfessionalNumber,
    aDate,
    inverted,
    anAmountOfBoxes,
    correct,
    someTimeInMs
  ) {
    this.patientNumber = aPatientNumber;
    this.professionalNumber = aProfessionalNumber;
    this.date = aDate;
    this.inverted = inverted;
    this.amountOfBoxes = anAmountOfBoxes;
    this.correct = correct;
    this.timeInMs = someTimeInMs;
  }

  sqlInsertText() {
    return `insert into corsiTest (
                patient_number,
                professional_number,
                date,
                inverted,
                amount_of_boxes,
                correct,
                time_in_ms) 
              values (
                '${this.patientNumber}',
                '${this.professionalNumber}',
                '${this.date.toISOString()}',
                '${this.inverted}',
                ${this.amountOfBoxes},
                '${this.correct}',
                ${this.timeInMs}
              );`;
  }
}

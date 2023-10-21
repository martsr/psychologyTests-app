export default class CardsTestRow {
  constructor(
    aPatientNumber,
    aProfessionalNumber,
    aDate,
    criteria,
    catchPersistence,
    mistakePersistence,
    round,
    event,
    timeInMs
  ) {
    this.patientNumber = aPatientNumber;
    this.professionalNumber = aProfessionalNumber;
    this.date = aDate;
    this.criteria = criteria;
    this.catchPersistence = catchPersistence;
    this.mistakePersistence = mistakePersistence;
    this.round = round;
    this.event = event;
    this.timeInMs = timeInMs;
  }

  sqlInsertText() {
    return `insert into cardsTest (
                  patient_number,
                  professional_number,
                  date,
                  criteria,
                  catch_persistence,
                  mistake_persistence,
                  round,
                  event,
                  time_in_ms) 
                values (
                  '${this.patientNumber}',
                  '${this.professionalNumber}',
                  '${this.date.toISOString()}',
                  '${this.criteria}',
                  '${this.catchPersistence}',
                  '${this.mistakePersistence}',
                  '${this.round}',
                  '${this.event}',
                  ${this.timeInMs}
                );`;
  }
}

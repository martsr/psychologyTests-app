export default class CardsTestRow {
    constructor(
      aPatientNumber, 
      aProfessionalNumber, 
      aDate, 
      criteria,
      catchPersistence,
      mistakePersistence,
      round,
      event) {
        this.patientNumber = aPatientNumber;
        this.professionalNumber = aProfessionalNumber; 
        this.date = aDate; 
        this.criteria = criteria;
        this.catchPersistence = catchPersistence;
        this.mistakePersistence = mistakePersistence;
        this.round = round;
        this.event = event;
        this.timeInMs = 0;
      }
  
      sqlInsertText() {
        return `insert into cardsTest (
                  patientNumber,
                  professionalNumber,
                  date,
                  criteria,
                  catchPersistence,
                  mistakePersistence,
                  round,
                  event,
                  timeInMs) 
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
                );`
      }
  }
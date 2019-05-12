export class NoteModel {

  public constructor(init?: Partial<NoteModel>) {
    Object.assign(this, init);
  }

  static agoTemplates = {
    prefix: '',
    suffix: ' ago',
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years'
  };

  id: number;
  title: string;
  text: string;
  notebook: number;
  lastModifiedOn: Date;

  static agoTemplate(t, n) {
    return NoteModel.agoTemplates[t] && NoteModel.agoTemplates[t].replace(/%d/i, Math.abs(Math.round(n)));
  }

  static ago(time) {
    if (!time) {
      return;
    }
    time = time.replace(/\.\d+/, ''); // remove milliseconds
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    const now = new Date();
    const seconds = Math.floor((now.getTime() - time) / 1000);
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    return NoteModel.agoTemplates.prefix + (
      seconds < 45 && NoteModel.agoTemplate('seconds', seconds) ||
      seconds < 90 && NoteModel.agoTemplate('minute', 1) ||
      minutes < 45 && NoteModel.agoTemplate('minutes', minutes) ||
      minutes < 90 && NoteModel.agoTemplate('hour', 1) ||
      hours < 24 && NoteModel.agoTemplate('hours', hours) ||
      hours < 42 && NoteModel.agoTemplate('day', 1) ||
      days < 30 && NoteModel.agoTemplate('days', days) ||
      days < 45 && NoteModel.agoTemplate('month', 1) ||
      days < 365 && NoteModel.agoTemplate('months', days / 30) ||
      years < 1.5 && NoteModel.agoTemplate('year', 1) ||
      this.agoTemplate('years', years)
    ) + NoteModel.agoTemplates.suffix;
  }

  modifiedAgo() {
    return NoteModel.ago(this.lastModifiedOn);
  }

}

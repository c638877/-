
export enum Tab {
  Timer = 'timer',
  Alarm = 'alarm'
}

export enum TimerMode {
  Focus = 'focus',
  Break = 'break'
}

export interface TimerSettings {
  focusMinutes: number;
  breakMinutes: number;
  periodicReminderMinutes: number;
}

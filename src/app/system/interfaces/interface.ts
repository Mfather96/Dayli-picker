export interface IMonth {
    title: string,
    id: number,
}

export interface CalendarTasks {
    [key: string]: Year
}

export interface Year {
    [key: string]: Month
}

export interface Month {
    [key: string]: Day
}

export interface Day {
    task: string,
}

export interface IMonth {
    title: string;
    id: number;
}

export interface CalendarTasks {
    [key: string]: Year;
}

export interface Year {
    [key: string]: Month;
}

export interface Month {
    [key: string]: Day;
}

export interface Day {
    task: string;
}

export interface ITask {
    id: string,
    year: string,
    month: string,
    day: string,
    taskString: string,
    date: Date
}

export interface IDateInfo {
    id: string,
    day: number,
    monthIndex: number,
}

export interface ICarouselContext<T> {
    $implicit: T,
    appCarouselOf: T[],
    next: () => void,
    prev: () => void,
}

export interface IPaginationContext<T> {
    $implicit: T[],
    appPaginationOf: T[],
    pages: Set<number>,
    activePage: number,
    next?: () => void,
    prev?: () => void,
}

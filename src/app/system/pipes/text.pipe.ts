import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'text',
    standalone: true,
    // pure: false // Грязный пайп, без кеширования значения
})
export class TextPipe implements PipeTransform {
    transform(value: string, upper?: string) {
        if (upper) {
            return `*${value.toUpperCase()}`
        }
        return `*${value}`
    }
}

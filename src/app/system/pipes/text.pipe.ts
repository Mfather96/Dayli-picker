import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'text',
    // pure: false // Грязный пайп, без кеширования значения
})
export class TextPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {

    }
}

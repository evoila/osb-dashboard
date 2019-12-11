import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {return value;}
        var re = new RegExp(args, 'g');
        return value.replace(re, '<mark class="highlighted">$&</mark>');
    }
}
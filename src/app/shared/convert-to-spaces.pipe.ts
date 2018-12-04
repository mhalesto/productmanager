import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'ConvertToSpaces'
})

export class ConvertToSpaces implements PipeTransform {
    transform(value: string, character: string): string {
      return value.replace(character, ' ');
    }
}



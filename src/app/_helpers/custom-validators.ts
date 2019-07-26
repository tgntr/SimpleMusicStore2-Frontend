import { FormControl } from '@angular/forms';

export function validateThatFileIsMP3() {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const split = file.split('.');
        const extension = split[split.length - 1];
        if ( extension.toLowerCase() !== "mp3" ) {
          return {
            validateThatFileIsMP3: true
          };
        }
        
        return null;
      }
  
      return null;
    };
  }
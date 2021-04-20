import { AbstractControl, ValidatorFn } from '@angular/forms';

export function blankValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace : 'value is only whitespace' } : null;
  };
}

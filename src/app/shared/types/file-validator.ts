import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileValidator(files: File[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (files && files.length > 1) {
      return { message : 'Galima pasirikti tik vieną failą.' };
    } else if (files && files[0].size > 10485760) { // 10MB
      return { message : 'Failas turi būti iki 10MB dydžio.' };
    } else if (files) {
      const extension = files[0].name.split('.').pop();
      if (!(extension === 'doc' || extension === 'pdf' || extension === 'docx')) {
        return { message: 'Failas turi būti dokumentas (.pdf, .docx arba .doc).' };
      }
    }
    return null;
  };
}

import { FormControl } from '@angular/forms';

export interface UpdateFormModel {
  email: FormControl<string | null | undefined>,
  firstName: FormControl<string | null | undefined>,
  lastName: FormControl<string | null | undefined>,
  password?: FormControl<string | null | undefined>,
  confirmPassword?: FormControl<string | null | undefined>,
}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {SalesManagersService} from "../../services/sales-managers.service";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-sales-manages-registration',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './sales-manages-registration.component.html',
  styleUrl: './sales-manages-registration.component.css'
})
export class SalesManagesRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SalesManagesRegistrationComponent>,
    private fb: FormBuilder,
    private salesManagerService: SalesManagersService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.salesManagerService.addUser(this.registrationForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

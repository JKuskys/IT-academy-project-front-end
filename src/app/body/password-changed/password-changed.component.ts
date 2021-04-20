import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.scss']
})
export class PasswordChangedComponent implements OnInit {

  constructor(private dialog: MatDialogRef<any>,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.router.navigate(['home']);
    this.dialog.close(PasswordChangedComponent);
  }
}

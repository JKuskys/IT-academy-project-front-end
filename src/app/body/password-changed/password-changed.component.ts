import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {go} from '../../store';
import {ROUTES} from '../../shared/constants/routes.const';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.scss']
})
export class PasswordChangedComponent {

  constructor(private dialog: MatDialogRef<any>,
              private store: Store<{}>) {
  }

  closeDialog() {
    this.store.dispatch(go({path: ROUTES.home}))
    this.dialog.close(PasswordChangedComponent);
  }
}

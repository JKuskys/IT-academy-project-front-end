import { Component, OnInit } from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.scss']
})
export class SuccessfulRegistrationComponent implements OnInit {

  constructor(private modalService: ModalService,
              private dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  closeDialog() {
    this.dialog.close(SuccessfulRegistrationComponent);
  }
}


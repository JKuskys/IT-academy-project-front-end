import { Component, OnInit } from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialog} from '@angular/material/dialog'
import { RegistrationComponent } from '../registration/registration.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private bodyText: string;

  constructor(private modalService: ModalService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openDialog(){
    this.dialog.open(RegistrationComponent);
  }
}

import {Component, OnInit} from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialog} from '@angular/material/dialog'
import {LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bodyText: string;

  constructor(private modalService: ModalService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }
  openDialog(){
    this.dialog.open(LoginComponent);
  }
 
  openModal(id: string) {
    this.modalService.open(id);
  }
}

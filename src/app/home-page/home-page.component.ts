import { Component, OnInit } from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private bodyText: string;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id:string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

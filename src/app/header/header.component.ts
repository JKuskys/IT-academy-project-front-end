import {Component, OnInit} from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}

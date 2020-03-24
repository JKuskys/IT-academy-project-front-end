import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import {Application} from '../shared/application';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    private bodyText: string;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openDialog() {
        this.dialog.open(RegistrationComponent);
    }
}

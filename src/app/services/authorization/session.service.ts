import {Injectable} from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) {
  }

  onLogOut() {
    window.addEventListener('storage', (event) => {
        if (event.storageArea == localStorage) {
          const token = localStorage.getItem('token');
          if (!isNotNullOrUndefined(token)) {
            // Perform logout
            //Navigate to home
            this.router.navigate(['home']);
          }
        }
      }
    );
  }
}

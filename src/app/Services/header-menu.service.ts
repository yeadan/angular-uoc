import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderMenu } from '../Models/header-menu';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenuService {
  headerManagement: BehaviorSubject<HeaderMenu> =
    new BehaviorSubject<HeaderMenu>({
      showAuthSection: false,
      showNoAuthSection: true,
    });
}

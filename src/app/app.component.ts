import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { I18nService } from './core/service/i18n.service';
import { AppState } from './store/app.state';
import { Get } from './store/info';
import { Fetch } from './store/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yuanchenmenchuang';
  showMenu: boolean;

  constructor(
      private i18nService: I18nService,
      private store: Store<AppState>,
      private router: Router 
  ) {
      this.i18nService.init('cn-CN', ['cn-CN']);
      this.i18nService.language = 'cn-CN';

      router.events.subscribe(() => {
        this.showMenu = window.location.href.indexOf('login') === -1;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new Get());
    this.store.dispatch(new Fetch());
  }
}

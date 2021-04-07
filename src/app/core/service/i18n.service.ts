import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { cnCN } from '../../../translations';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  defaultLanguage: string;
  supportedLanguage: string[];

  constructor(private translateService: TranslateService) {
    translateService.setTranslation('cn-CN', cnCN);
  }

  init(defaultLanguage: string, supportedLanguages: string[]) {
      this.defaultLanguage = defaultLanguage;
      this.supportedLanguage = supportedLanguages;
      this.language = '';
  }

  set language(language: string) {
      this.translateService.use(language);
  }

  getLanguage(key: string) {
      let value = this.translateService.translations[this.defaultLanguage];
      key.split('.').forEach(k => value = value[k]);
      return value;
  }
}

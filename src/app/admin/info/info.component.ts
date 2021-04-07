import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InfoModel } from 'src/app/core/interfaces/info';
import { AppState } from 'src/app/store/app.state';
import { Update } from 'src/app/store/info';
import { getInfo, isLoading } from 'src/app/store/info/info.selectors';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  info: InfoModel;

  infoForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      desc: ['', Validators.required],
      contacts: [''],
      phone: [''],
      email: [''],
      wechat: [''],
  });

  isChanged: boolean = false;

  isLoading$ = this.store.select(isLoading);

  constructor(
      private fb: FormBuilder,
      private store: Store<AppState>
  ) { 
      this.infoForm.valueChanges.subscribe(selectedValue => {
          if (this.info && selectedValue) {
              if (this.info.desc !== selectedValue.desc) this.isChanged = true;
              else if (this.info.contacts !== selectedValue.contacts) this.isChanged = true;
              else if (this.info.phone !== selectedValue.phone) this.isChanged = true;
              else if (this.info.email !== selectedValue.email) this.isChanged = true;
              else if (this.info.wechat !== selectedValue.wechat) this.isChanged = true;
              else this.isChanged = false;
          }
      })
  }

  ngOnInit(): void {
    this.store.select(getInfo)
      .subscribe(info => {
          this.info = Object.assign({}, info);
          this.infoForm.setValue({
              name: this.info.name,
              desc: this.info.desc || '',
              contacts: this.info.contacts || '',
              phone: this.info.phone || '',
              email: this.info.email || '',
              wechat: this.info.wechat || ''
          });
      });
  }

  submit() {
      if (this.infoForm.valid && this.isChanged) {           
        this.info.desc = this.info.desc === this.infoForm.get('desc')?.value ? this.info.desc : this.infoForm.get('desc')?.value;
        this.info.contacts = this.info.contacts === this.infoForm.get('contacts')?.value ? this.info.contacts : this.infoForm.get('contacts')?.value;
        this.info.phone = this.info.phone === this.infoForm.get('phone')?.value ? this.info.phone : this.infoForm.get('phone')?.value;
        this.info.email = this.info.email === this.infoForm.get('email')?.value ? this.info.email : this.infoForm.get('email')?.value;
        this.info.wechat = this.info.wechat === this.infoForm.get('wechat')?.value ? this.info.wechat : this.infoForm.get('wechat')?.value;
        
        this.store.dispatch(new Update(Object.assign({}, this.info)));
      }
  }

}

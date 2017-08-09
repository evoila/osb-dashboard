import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ServiceKeysService} from "../service-keys.service";

@Component({
  selector: 'sb-service-keys-details',
  templateUrl: './service-keys-detail.component.html',
  styleUrls: ['./service-keys-detail.component.scss']
})
export class ServiceKeysDetailComponent implements OnInit {
  readonly ENTITY: string = 'destinations';
  serviceKey: any;
  credentials_keys: any;

  constructor(protected readonly service: ServiceKeysService,
              protected readonly route: ActivatedRoute,
              protected readonly router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       if (params['serviceKeyId']) {
         this.service.get(params['serviceKeyId']).subscribe((key: any) => {
           console.log(key);
           this.serviceKey = key;
           this.credentials_keys = Object.keys(key.credentials);
         });
       }
    });

  }

  delete(): void {
    this.service.delete(this.serviceKey.id)
      .subscribe((key: any) => {
        this.redirect();
      });
  }


  private redirect(): void {
    this.router.navigate(['/']);
  }

}

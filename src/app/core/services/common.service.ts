import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {


    public loggedInUsername = new BehaviorSubject<string>("");

    constructor(
        private _api: ApiService,
    ) { }

    getUserIPAdress() {
        return this._api.get('https://jsonip.com/');
    }
    
}


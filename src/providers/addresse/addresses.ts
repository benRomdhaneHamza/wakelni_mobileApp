import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressesProvider {
    apiUrl = ENV.BASE_URL + '/addresses';
    currentUser = null;

    constructor(public http: HttpClient,
        private storage: Storage) {
        this.storage.get('user').then((_currentUser) => {
            if (_currentUser)
                this.currentUser = _currentUser.token ? _currentUser : null;
                
        });
    }
    addAddressesToUser(_addresses) {
        return new Promise(async (resolve, reject) => {
            this.currentUser.address = _addresses;
            this.storage.set('user', this.currentUser);
            return resolve(true)
        });
    }
    async addUserAddress(_description, _lat, _lng, _city) {
        const currentUser = await this.storage.get('user');
        const data = {
            description: _description,
            lat: _lat,
            lng: _lng,
            city: _city
        }
        console.log(currentUser)
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.token
            }
           
                this.http.post(this.apiUrl + "/user/",
                    data,
                    { headers: headers }).subscribe(async _addresses => {
                        this.addAddressesToUser(_addresses)
                        console.log(_addresses);
                        
                        console.log(this.currentUser);
                        return resolve(_addresses);
                    }, _err => {
                        return reject(_err);
                    })
            
        });
    }
}

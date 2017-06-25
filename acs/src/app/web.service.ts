import {Injectable} from '@angular/core';

@Injectable()
export class WebService {

    constructor() {
    }

    isAuthenticated(): boolean {
        return true;
    }
}

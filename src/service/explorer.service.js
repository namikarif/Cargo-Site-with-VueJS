import {Subject} from 'rxjs';

const userDetail = new Subject();
const userStream = userDetail.asObservable();

export function setUser(userdetail) {
    userDetail.next(JSON.parse(JSON.stringify(userdetail)));
}

export function getUser() {
    return userStream;
}

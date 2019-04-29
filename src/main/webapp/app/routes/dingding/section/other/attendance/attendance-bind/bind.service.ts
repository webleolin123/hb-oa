import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';
import {UserListModel} from './userList.model';
import {
    WORKFLOW_TO_ATTENDANCE_IMPORT_DK_BIND_API,
} from '../../../../../../app.constants';

@Injectable()
export class BindService {
    private resourceUrl_bind = WORKFLOW_TO_ATTENDANCE_IMPORT_DK_BIND_API;

    constructor(private http: HttpClient) {
    }

    bind(userListModel: UserListModel): Observable<HttpResponse<UserListModel>> {
        const options = createRequestOption(userListModel);
        return this.http.put<UserListModel>(this.resourceUrl_bind,userListModel, {
            params: options,
            observe: 'response'
        });
    }
}

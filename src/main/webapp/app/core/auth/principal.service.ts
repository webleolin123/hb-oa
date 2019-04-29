import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AccountService} from './account.service';

// import { JhiTrackerService } from '../tracker/tracker.service';

@Injectable({providedIn: 'root'})
export class Principal {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(
        private account: AccountService,
        // private trackerService: JhiTrackerService
    ) {}

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {//是否有授权、认证、认证角色
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {//如果有授权，认证，且有角色 判断是否匹配特定角色
            if (this.userIdentity.authorities.includes(authorities[i])) {//如果发现有匹配角色
                return true;
            }
        }

        return false;
    }

    hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {//如果没授权
            return Promise.resolve(false);
        }

        return this.identity().then(//授权之后 验证 是否匹配角色
            id => {
                return Promise.resolve(id.authorities && id.authorities.includes(authority));
            },
            () => {//没发现或没有匹配角色
                return Promise.resolve(false);
            }
        );
    }

    identity(force?: boolean): Promise<any> {
        if (force === true) {//用户认证不存在
            this.userIdentity = undefined;
        }
        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {//用户认证存在
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.userIdentity = account;
                    this.authenticated = true;
                    // this.trackerService.connect();
                } else {
                    this.userIdentity = null;
                    this.authenticated = false;
                }
                this.authenticationState.next(this.userIdentity);
                return this.userIdentity;
            })
            .catch(err => {
                console.log('err登录',err);
                // if (this.trackerService.stompClient && this.trackerService.stompClient.connected) {
                // this.trackerService.disconnect();
                // }
                this.userIdentity = null;
                this.authenticated = false;
                this.authenticationState.next(this.userIdentity);
                return null;
            });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}

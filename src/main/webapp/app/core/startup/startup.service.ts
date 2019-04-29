import {Injectable, Injector, Inject,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN} from '@delon/theme';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {ACLService} from '@delon/acl';

import {NzIconService} from 'ng-zorro-antd';
import {ICONS_AUTO} from '../../../style-icons-auto';
import {ICONS} from '../../../style-icons';
import {Principal} from '../auth/principal.service';
import {
    IMAGE_API_URL,
    BASE_API_URL, TEST_API,
} from 'app/app.constants';
//广播使用
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";
import {ACCOUNT, OPERATOR} from "@shared";
import {CacheService} from "@delon/cache";
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService implements OnInit{
    subInfo:Subscription;//订阅编辑成功广播消息
    users: any = {};

    //存放users信息
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        private settings: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector,
        private principal: Principal,
        private eventManager: JhiEventManager,
        public cache: CacheService,
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
        this.users.avatar="./assets/tmp/img/default_avatar.png";
    }
    ngOnInit(){
        this.registerChangeInUsers();
    }
    registerChangeInUsers() {
        this.subInfo=this.eventManager.subscribe('userInfo', (response) => {
            if(response.name=='userInfo'){
                this.settings.setUser(response.content);
            }
        });
    }
    viaHttp(resolve: any, reject: any) {

        let isAuth = this.principal.isIdentityResolved();
        if( isAuth){
            this.principal.identity().then(account => {
                this.initPage(resolve, reject,account);
            })
        }else{//使用account判断是否已登录 暂时解决登录后刷新页面左侧菜单不显示问题
            let login= this.cache.getNone(ACCOUNT);
            if(login){
                this.principal.identity().then(account => {
                    this.initPage(resolve, reject,account);
                })
            }
            else{
                resolve(false);
            }
        }
    }
    initPage(resolve: any, reject: any,account){
        if (account != null && (account.authorities.includes('ROLE_ADMIN') || account.authorities.includes('ROLE_MANAGER'))) {
            this.cache.set(ACCOUNT,account);
            this.cache.set(OPERATOR,account.login);
            this.users.login = account.login;
            this.users.name = account.nickname;
            this.users.email = account.email;
            this.users.avatar = account.imageUrl ? IMAGE_API_URL + account.imageUrl : "./assets/tmp/img/default_avatar.png";
            // 用户信息：包括姓名、头像、邮箱地址
            this.settings.setUser(this.users);
            zip(
                this.httpClient.get('assets/tmp/app-data.json')
                // this.httpClient.get(BASE_API_URL + TEST_API)
            ).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError(([appData]) => {
                    return [appData];
                })
            ).subscribe(([appData]) => {
                    // application data
                    const res: any = appData;
                    // 应用信息：包括站点名、描述、年份
                    this.settings.setApp(res.app);
                    // 设置页面标题的后缀
                    this.titleService.suffix = res.app.name;
                    // ACL：设置权限为全量
                    this.aclService.setFull(true);
                    // 初始化菜单
                    this.menuService.add(res.menu);
                    if (account.authorities.includes('ROLE_ADMIN')) {
                        this.menuService.add(res.menu);
                    }
                    else {
                        this.menuService.add(res.menu);
                    }
                    resolve(true);
                },
                () => {
                },
                () => {
                    resolve(true);
                });
        }
        else {
            resolve(false);
        }
    }
    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            this.viaHttp(resolve, reject);
            // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
            // this.viaMock(resolve, reject);
        });
    }
}

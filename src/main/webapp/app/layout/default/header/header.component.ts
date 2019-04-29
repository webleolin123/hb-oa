import {Component, ChangeDetectionStrategy,OnInit} from '@angular/core';
import {SettingsService} from '@delon/theme';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
    searchToggleStatus: boolean;
    constructor(
        public settings: SettingsService,
    ) {}
    ngOnInit() {
    }
    toggleCollapsedSidebar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }
}

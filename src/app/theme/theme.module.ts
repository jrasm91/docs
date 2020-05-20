import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NbLayoutModule,
	NbMenuModule,
	NbSidebarModule,
	NbButtonModule,
	NbSelectModule,
	NbIconModule,
	NbThemeModule,
	NbCardModule,
	NbCheckboxModule,
	NbListModule,
	NbSpinnerModule,
	NbTooltipModule,
	NbToggleModule,
	NbAlertModule,
} from '@nebular/theme';
import { DEFAULT_THEME } from './theme.default';
import { COSMIC_THEME } from './theme.cosmic';
import { CORPORATE_THEME } from './theme.corporate';
import { DARK_THEME } from './theme.dark';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
	NbCardModule,
	NbLayoutModule,
	NbMenuModule,
	NbSidebarModule,
	NbSpinnerModule,
	NbButtonModule,
	NbSelectModule,
	NbListModule,
	NbIconModule,
	NbCheckboxModule,
	NbTooltipModule,
	NbToggleModule,
	NbAlertModule,
];

@NgModule({
	imports: [CommonModule, RouterModule, ...NB_MODULES],
	exports: [CommonModule, ...NB_MODULES],
	declarations: [],
})
export class ThemeModule {
	static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders>{
			ngModule: ThemeModule,
			providers: [
				...NbThemeModule.forRoot(
					{
						name: DEFAULT_THEME.name,
					},
					[DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
				).providers,
			],
		};
	}
}

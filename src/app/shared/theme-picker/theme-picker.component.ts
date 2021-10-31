import {
  ChangeDetectionStrategy,
  Component, ViewEncapsulation
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { StyleManagerService } from '@shared/style-manager';
import { ThemeStorageService } from './theme-storage/theme-storage.service';
import { Theme } from './theme-storage/theme.model';

@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.component.html',
  styleUrls: ['theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {

  public currentTheme: Theme;

  // The below colors need to align with the themes defined in theme-picker.scss
  public readonly themes: Theme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: true,
    },
  ];

  public constructor(
    public styleManager: StyleManagerService,
    private themeStorage: ThemeStorageService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'theme-demo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/theme-demo.svg')
    );

    this.loadTheme();
  }

  private loadTheme(): void {
    const themeName = this.themeStorage.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
      return;
    }

    const defaultTheme = this.themes.find(t => t.isDefault);
    this.selectTheme(defaultTheme.name);
  }

  public selectTheme(themeName: string): void {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    this.themeStorage.storeTheme(this.currentTheme);
  }

}

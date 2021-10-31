import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Theme } from './theme.model';

@Injectable()
export class ThemeStorageService {

  public readonly storageKey = 'encodot-theme';

  private readonly themeSubject = new Subject<Theme>();
  public readonly theme$: Observable<Theme> = this.themeSubject.asObservable();

  public storeTheme(theme: Theme): void {
    window.localStorage.setItem(this.storageKey, theme.name);
    this.themeSubject.next(theme);
  }

  public getStoredThemeName(): string {
    return window.localStorage.getItem(this.storageKey);
  }

  public clearStorage(): void {
    window.localStorage.removeItem(this.storageKey);
  }

}

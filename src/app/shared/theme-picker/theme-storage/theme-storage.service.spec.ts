import { timeout } from 'rxjs/operators';
import { ThemeStorageService } from './theme-storage.service';
import { Theme } from './theme.model';

const testTheme: Theme = {
  primary: '#000000',
  accent: '#ffffff',
  name: 'test-theme'
};

describe('ThemeStorageService Service', () => {
  const service = new ThemeStorageService();
  const getCurrTheme = () => window.localStorage.getItem(service.storageKey);
  const secondTestTheme = {
    primary: '#666666',
    accent: '#333333',
    name: 'other-test-theme'
  };

  beforeEach(() => {
    window.localStorage[service.storageKey] = testTheme.name;
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should set the current theme name', () => {
    expect(getCurrTheme()).toEqual(testTheme.name);
    service.storeTheme(secondTestTheme);
    expect(getCurrTheme()).toEqual(secondTestTheme.name);
  });

  it('should get the current theme name', () => {
    const theme = service.getStoredThemeName();
    expect(theme).toEqual(testTheme.name);
  });

  it('should clear the stored theme data', () => {
    expect(getCurrTheme()).not.toBeNull();
    service.clearStorage();
    expect(getCurrTheme()).toBeNull();
  });

  it('should emit an event when setTheme is called', done => {
    service.theme$.pipe(
      timeout(200)
    ).subscribe(t => {
      expect(t.name).toBe(secondTestTheme.name);
      done();
    });

    service.storeTheme(secondTestTheme);
  });
});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { ThemePickerComponent } from './theme-picker.component';
import { ThemePickerModule } from './theme-picker.module';

describe('ThemePicker', () => {

  let component: ThemePickerComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ ThemePickerModule ],
    }).compileComponents();

    component = TestBed.createComponent(ThemePickerComponent).componentInstance;
  }));

  it('should install theme based on name', () => {
    const name = 'pink-bluegrey';
    jest.spyOn(component.styleManager, 'setStyle');
    component.selectTheme(name);
    expect(component.styleManager.setStyle).toHaveBeenCalled();
    expect(component.styleManager.setStyle).toHaveBeenCalledWith('theme', `${name}.css`);
  });
});

import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Host, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: 'button[appSpinner]',
})
export class SpinnerDirective implements OnInit {

  @Input()
  private spinnerColor: ThemePalette = 'primary';

  @Input() icon: string;

  private showSpinner: boolean = null;
  @Input()
  public set appSpinner(show: boolean) {
    if (show === this.showSpinner) {
      return;
    }

    if (show) {
      this.addSpinner();
      this.showSpinner = true;
      return;
    }

    this.showSpinner = false;
    this.host.disabled = false;

    if (this.icon) {
      this.addIcon(this.icon);
      return;
    }

    this.clear();
  }

  constructor(
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    @Host() private host: MatButton
  ) {}

  public ngOnInit(): void {
    this.appSpinner = false;
  }

  private addIconBase(): ComponentRef<MatIcon> {
    const matIconFactory = this.resolver.resolveComponentFactory(MatIcon);
    const matIconRef = this.viewContainer.createComponent(matIconFactory);

    const contentContainer = this.elementRef.nativeElement.querySelector('span');

    this.renderer.insertBefore(
      contentContainer,
      matIconRef.location.nativeElement,
      contentContainer.firstChild
    );

    return matIconRef;
  }

  private addIcon(icon: string): void {
    this.clear();

    const matIconRef = this.addIconBase();
    matIconRef.instance.inline = true;
    this.renderer.addClass(matIconRef.location.nativeElement, 'spinner');
    matIconRef.location.nativeElement.textContent = icon;
  }

  private addSpinner(): void {
    this.clear();

    const matIconRef = this.addIconBase();

    const spinnerFactory = this.resolver.resolveComponentFactory(MatProgressSpinner);
    const spinnerRef = this.viewContainer.createComponent(spinnerFactory);
    spinnerRef.instance.diameter = 20;
    spinnerRef.instance.color = this.spinnerColor;
    spinnerRef.instance.mode = 'indeterminate';

    this.renderer.appendChild(
      matIconRef.location.nativeElement,
      spinnerRef.location.nativeElement
    );

    this.host.disabled = true;
  }

  private clear(): void {
    this.viewContainer.clear();
  }

}

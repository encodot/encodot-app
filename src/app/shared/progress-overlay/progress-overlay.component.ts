import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-overlay',
  templateUrl: './progress-overlay.component.html',
  animations: [
    trigger('showHideBlur', [
      state('show', style({
        'backdrop-filter': 'blur(2px)'
      })),
      state('hide', style({
        'backdrop-filter': 'blur(0)'
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ])
    ]),
    trigger('showHideOpacity', [
      state('show', style({
        opacity: '100%'
      })),
      state('hide', style({
        opacity: '0%'
      })),
      transition('show => hide', [
        animate('1s')
      ]),
      transition('hide => show', [
        animate('1s')
      ])
    ])
  ]
})
export class ProgressOverlayComponent {

  @Input()
  public show: boolean = false;
  public visible: boolean = false;

  public animationStart(event: AnimationEvent): void {
    if (event.fromState === 'hide') {
      this.visible = true;
    }
  }

  public animationDone(event: AnimationEvent): void {
    if (event.fromState === 'show') {
      this.visible = false;
    }
  }

}

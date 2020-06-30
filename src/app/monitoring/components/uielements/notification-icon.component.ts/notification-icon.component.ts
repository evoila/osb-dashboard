import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sb-notification-icon',
    template: `
    <section>
        <i [ngClass]="classes"></i>
        <p *ngIf="message">{{message}}</p>
    </section>
    `,
    styles: ['section {font-size: 3em; position: fixed; left: calc(50vw - 0.5em); top: calc(50vh - 0.5em);}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationIconComponent implements OnInit {
    @Input('classes')
    public classes: String[];

    @Input()
    public message: String;

    constructor() { }
    ngOnInit() { }
}
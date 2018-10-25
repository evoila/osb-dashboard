import { Injectable } from '@angular/core';

function getWindow(): Window {
  return window;
}

// see http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
@Injectable()
export class WindowService {
  get nativeWindow(): Window {
    return getWindow();
  }
}
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNgVerifyComponent } from "./prime-ng-verify/prime-ng-verify.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNgVerifyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'test-space-cds';
}

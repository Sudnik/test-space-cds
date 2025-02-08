import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNgVerifyComponent } from "./prime-ng-verify/prime-ng-verify.component";
import { D3VerifyComponent } from './d3-verify/d3-verify.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNgVerifyComponent, D3VerifyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'test-space-cds';
}

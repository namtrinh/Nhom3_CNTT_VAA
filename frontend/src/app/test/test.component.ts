import { Component } from '@angular/core';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgxPrintModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']  // Corrected to styleUrls
})
export class TestComponent {
  constructor(private printService: NgxPrintService) { }

  printMe() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'invoice',  // Corrected to an actual ID
      // Add any other print options as needed
    });
    this.printService.print(customPrintOptions);
  }
}

import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AnnualDataModel } from '../annual-data.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentResultsComponent {
  #investmentService: InvestmentService = inject(InvestmentService);

  readonly results: Signal<AnnualDataModel[] | undefined> = this.#investmentService.results.asReadonly();
}

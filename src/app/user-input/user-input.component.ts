import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInputModel } from './investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputComponent {
  calculate: OutputEmitterRef<InvestmentInputModel> = output();

  #investmentService: InvestmentService = inject(InvestmentService);

  enteredInitialInvestment: WritableSignal<string> = signal('0');
  enteredAnnualInvestment: WritableSignal<string> = signal('0');
  enteredExpectedReturn: WritableSignal<string> = signal('5');
  enteredDuration: WritableSignal<string> = signal('10');

  onSubmit(): void {
    this.#investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration()
    });
    this.enteredDuration.set('0');
    this.enteredExpectedReturn.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredInitialInvestment.set('0');
  }
}

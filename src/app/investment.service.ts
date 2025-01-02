import { Injectable, signal, WritableSignal } from '@angular/core';
import { AnnualDataModel } from './annual-data.model';
import type { InvestmentInputModel } from './user-input/investment-input.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  results: WritableSignal<AnnualDataModel[] | undefined> = signal<AnnualDataModel[] | undefined>(undefined);

  calculateInvestmentResults(date: InvestmentInputModel): void {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = date;
    const annualData: AnnualDataModel[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year
      });
    }

    this.results.set(annualData);
  }
}

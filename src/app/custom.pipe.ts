import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true
})
export class CustomPipe implements PipeTransform {


  billion: number = 1_000_000_000;
  million: number = 1_000_000_000;
  kran: number = 1_000_000_000;

  transform(value: number, ...args: unknown[]): string {
    if (value === null || value === undefined) {
      return '';
    }

    const absValue = Math.abs(value);

    if (absValue >= 1_000_000_000) {
      return this.formatNumber(value, 1_000_000_000, 'B');
    }
    else if (absValue >= 1_000_000) {
      return this.formatNumber(value, 1_000_000, 'M');
    }
    else if (absValue >= 1_000) {
      return this.formatNumber(value, 1_000, 'K');
    }

    return value.toString();
  }

  private formatNumber(value: number, divisor: number, suffix: string): string {
    const formattedValue = (value / divisor).toFixed(2);
    const number = parseFloat(formattedValue);
    return `${number}${suffix}`;
  }

}

import { Component, HostListener } from '@angular/core';
import { CalculatorService, Button } from './calculator.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {

    calculations: Button[] = [];
    calculationsFormatted = '0';
    result = '0';
    prevEqual = false;

    constructor(public service: CalculatorService) { }

    action(button: Button) {

        try {

            // button "C"
            if (button.type === 'action' && button.value.toLowerCase() === 'c') {

                return this.initState()
            }

            // button "<"
            if (button.type === 'action' && button.value === '<') {

                this.calculations = this.service.deleteStep(this.calculations)

                if (this.calculations.length === 0) {

                    this.initState()
                }
            }

            // button type number & prev button "=" 
            if (this.prevEqual) {

                if (button.type === 'number') {

                    this.initState()
                }

                this.prevEqual = false;
            }

            // check situations like: '..', '.+'
            if (this.service.isDotVariantPresent(this.calculations, button)) {
            
                return;
            }

            // push only numbers and operators, actions are disallowed
            if (button.type !== 'action') {

                this.calculations.push(button)
            }

            // last operator wins - pick last one
            this.calculations = this.service.pickLastOneOperator(this.calculations)

            // format formula
            this.calculationsFormatted = this.service.formatCalculations(this.calculations)

            // buttons - "*/+-="
            if (button.type === 'operator' || button.value === '=') {

                this.result = this.service.calculateFormula(
                    this.service.removeTrailingOperators(
                        this.calculations
                    )
                )

                if (button.value === '=') {

                    this.initCalculationFromResult(this.result)

                    this.prevEqual = true;
                }
            }
            
            // on first collection of numbers like 4343443
            if (this.service.containsOnlyNumber(this.calculations) && button.type === 'number') {

                this.result = this.calculations.reduce((prev, curr) => prev + '' + curr.value, '')
            }

        } catch (error) {

            this.result = error.toString()
        }

    }

    @HostListener('document:keydown', ['$event'])
    handleKey($event) {

        const key = this.service.keyHash[$event.keyCode]
        const button = this.service.getButtonByValue(key)

        if (button) {

            this.action(button)
        }
    }

    private initState() {

        this.calculations = [];
        this.calculationsFormatted = '0';
        this.result = '0';
    }

    private initCalculationFromResult(result: string) {

        this.calculations = [
            {
                type: 'number',
                value: result
            }
        ]
        this.calculationsFormatted = this.service.formatCalculations(this.calculations)
    }

}

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Service: Calculator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CalculatorService]
        });
    });

    it('should ...', inject([CalculatorService], (service: CalculatorService) => {
        expect(service).toBeTruthy();
    }));


    it('calculateFormula - should ...', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            // 25
            { type: 'number', value: '10' },
            { type: 'operator', value: '/' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
            // +55
            { type: 'operator', value: '+' },
            { type: 'number', value: '5' },
            { type: 'number', value: '5' },
            // +10
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ]

        const res = service.calculateFormula(data)

        expect(res).toBe('90')

    }));

    it('calculateFormula - minus operator operator at first position', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            // -55
            { type: 'operator', value: '-' },
            { type: 'number', value: '5' },
            { type: 'number', value: '5' },
            // +10
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ]

        const res = service.calculateFormula(data)

        expect(res).toBe('-45')

    }));

    it('calculateFormula - plus operator at first position', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ]

        const res = service.calculateFormula(data)

        expect(res).toBe('10')

    }));

    it('calculateFormula - it should throw Error', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
            { type: 'operator', value: '/' },
            { type: 'number', value: '0' },
        ]

        try {

            service.calculateFormula(data)

        } catch (err) {

            expect(err.toString()).toBe('Error: #DIV/0 error!')
        }

    }));

    it('calculateFormula - 00000 at first position', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '0' },
            { type: 'number', value: '0' },
            { type: 'number', value: '0' },
            { type: 'number', value: '0' },
            { type: 'number', value: '0' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '1' },
            { type: 'number', value: '0' },
        ]

        const res = service.calculateFormula(data)

        expect(res).toBe('10')

    }));

    it('calculateFormula - validate numbers - plus/minus group - first position',
        inject([CalculatorService], (service: CalculatorService) => {

            try {

                const data = [
                    { type: 'number', value: '1' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '2' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '0' },
                    { type: 'operator', value: '+' },
                    { type: 'number', value: '1' },
                ]

                const res = service.calculateFormula(data)

            } catch (error) {

                expect(error.toString()).toBe('Error: "1.2.0" is not a number!')
            }

        }));

    it('calculateFormula - validate numbers - plus/minus group - second position',
        inject([CalculatorService], (service: CalculatorService) => {

            try {

                const data = [
                    { type: 'number', value: '1' },
                    { type: 'number', value: '0' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '5' },
                    { type: 'operator', value: '+' },
                    { type: 'number', value: '1' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '2' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '0' },
                    { type: 'operator', value: '+' },
                    { type: 'number', value: '1' },
                ]

                const res = service.calculateFormula(data)

            } catch (error) {

                expect(error.toString()).toBe('Error: "1.2.0" is not a number!')
            }

        }));

    it('calculateFormula - validate numbers - multiply/divide group - first position',
        inject([CalculatorService], (service: CalculatorService) => {

            try {

                const data = [
                    { type: 'number', value: '1' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '2' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '0' },
                    { type: 'operator', value: '*' },
                    { type: 'number', value: '1' },
                    { type: 'number', value: '2' },
                ]

                const res = service.calculateFormula(data)

            } catch (error) {

                expect(error.toString()).toBe('Error: "1.2.0" is not a number!')
            }

        }));

    it('calculateFormula - validate numbers - multiply/divide group - second position',
        inject([CalculatorService], (service: CalculatorService) => {

            try {

                const data = [
                    { type: 'number', value: '1' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '2' },
                    { type: 'operator', value: '*' },
                    { type: 'number', value: '1' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '2' },
                    { type: 'number', value: '.' },
                    { type: 'number', value: '0' },
                    { type: 'operator', value: '*' },
                    { type: 'number', value: '1' },
                    { type: 'number', value: '2' },
                ]

                const res = service.calculateFormula(data)

            } catch (error) {

                expect(error.toString()).toBe('Error: "1.2.0" is not a number!')
            }

        }));


    it('calculateFormula - very complex example', inject([CalculatorService], (service: CalculatorService) => {

        // - 10 - 18 / 9 * 4 / 7 + 5 + 6 + 144994 + 95 + 5 - 6 * 9 / 6 === 145084.85714285713
        const data = [

            { type: 'operator', value: '-' },
            { type: 'number', value: '1' },
            { type: 'number', value: '0' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '1' },
            { type: 'number', value: '8' },
            { type: 'operator', value: '/' },
            { type: 'number', value: '9' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '4' },
            { type: 'operator', value: '/' },
            { type: 'number', value: '7' },

            { type: 'operator', value: '+' },
            { type: 'number', value: '5' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '6' },

            { type: 'operator', value: '+' },
            { type: 'number', value: '1' },
            { type: 'number', value: '4' },
            { type: 'number', value: '4' },
            { type: 'number', value: '9' },
            { type: 'number', value: '9' },
            { type: 'number', value: '4' },

            { type: 'operator', value: '+' },
            { type: 'number', value: '9' },
            { type: 'number', value: '5' },

            { type: 'operator', value: '+' },
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '6' },

            { type: 'operator', value: '*' },
            { type: 'number', value: '9' },
            { type: 'operator', value: '/' },
            { type: 'number', value: '6' },

        ]

        const res = service.calculateFormula(data)

        expect(res).toBe('145084.85714285713')

    }));

    it('calculateDivMul', inject([CalculatorService], (service: CalculatorService) => {

        const data = '4/2*2';

        const res = service.calculateDivMul(data)

        expect(res).toBe('4')

    }));

    it('calculateDivMul - slash at first position', inject([CalculatorService], (service: CalculatorService) => {

        const data = '/4/2*2';

        try {

            service.calculateDivMul(data)

        } catch (err) {

            expect(err.toString()).toBe('Error: "/4" is wrong!')
        }

    }));

    it('calculateDivMul - start at first position', inject([CalculatorService], (service: CalculatorService) => {

        const data = '*4/2*2';

        try {

            service.calculateDivMul(data)

        } catch (err) {

            expect(err.toString()).toBe('Error: "*4" is wrong!')
        }

    }));

    it('calculateDivMul - DIV 0', inject([CalculatorService], (service: CalculatorService) => {

        const data = '*4/2/0*2';

        try {

            service.calculateDivMul(data)

        } catch (err) {

            expect(err.toString()).toBe('Error: #DIV/0 error!')
        }

    }));



    it('pickLastOneOperator', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '9' },
            { type: 'operator', value: '*' },
            { type: 'operator', value: '*' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '4' },
        ]

        const res = service.pickLastOneOperator(data)

        expect(res).toEqual([
            { type: 'number', value: '9' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '4' },
        ])

    }));

    it('removeTrailingOperators', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
            { type: 'operator', value: '*' },
        ]

        const res = service.removeTrailingOperators(data)

        expect(res).toEqual([
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ])

    }));

    it('removeTrailingOperators - list should not remove value - fail test', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ]

        const res = service.removeTrailingOperators(data)

        expect(res).toEqual([
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '5' },
        ])

    }));

    it('removeTrailingOperators - should be empty - fail test', inject([CalculatorService], (service: CalculatorService) => {

        const data = []

        const res = service.removeTrailingOperators(data)

        expect(res).toEqual([])

    }));


    it('should support on operator click calculation - so with pending operator',
        inject([CalculatorService], (service: CalculatorService) => {

            const data = [
                { type: 'number', value: '20' },
                { type: 'operator', value: '*' },
                { type: 'operator', value: '-' },
                { type: 'operator', value: '/' },
                { type: 'number', value: '5' },
                { type: 'operator', value: '*' },
            ]

            const res = service.calculateFormula(
                service.pickLastOneOperator(
                    service.removeTrailingOperators(
                        data
                    )
                )
            )

            expect(res).toBe('4')

        }));

    it('formatCalculations', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '1' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'number', value: '3' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '1' },
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
        ]

        const res = service.formatCalculations(data)

        expect(res).toBe('12 + ( 23 * 15 ) - 3')
    }));

    it('formatCalculations - empty list', inject([CalculatorService], (service: CalculatorService) => {

        const data = []

        const res = service.formatCalculations(data)

        expect(res).toBe('0')
    }));

    it('formatCalculations - one item', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '1' },   
        ]

        const res = service.formatCalculations(data)

        expect(res).toBe('1')

    }));

    it('deleteStep', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
        ]

        const res = service.deleteStep(data)

        expect(res).toEqual([
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
        ])

    }));

    it('deleteStep - empty list', inject([CalculatorService], (service: CalculatorService) => {

        const data = []

        const res = service.deleteStep(data)

        expect(res).toEqual([])

    }));

    it('isDotVariantPresent - double dot', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
            { type: 'number', value: '.' },
        ]

        const res = service.isDotVariantPresent(data, { type: 'number', value: '.' })

        expect(res).toEqual(true)

    }));

    it('isDotVariantPresent - operator', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
            { type: 'number', value: '.' },
        ]

        const res = service.isDotVariantPresent(data, { type: 'operator', value: '*' })

        expect(res).toEqual(true)

    }));

    it('isDotVariantPresent - action', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
            { type: 'number', value: '.' },
        ]

        const res = service.isDotVariantPresent(data, { type: 'action', value: '=' })

        expect(res).toEqual(true)

    }));

    it('isDotVariantPresent - it is not', inject([CalculatorService], (service: CalculatorService) => {

        const data = [
            { type: 'number', value: '5' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '3' },
        ]

        const res = service.isDotVariantPresent(data, { type: 'action', value: '.' })

        expect(res).toEqual(false)

    }));

    it('isDotVariantPresent - empty list', inject([CalculatorService], (service: CalculatorService) => {

        const data = []

        const res = service.isDotVariantPresent(data, { type: 'action', value: '.' })

        expect(res).toEqual(false)

    }));

    it('validateNumber - is number', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.validateNumber('12')

        expect(res).toBe(undefined)

    }));

    it('validateNumber - is not a number', inject([CalculatorService], (service: CalculatorService) => {

        try {
            
            service.validateNumber('1.2.3')
        
        } catch (error) {
            
            expect(error.toString()).toBe('Error: "1.2.3" is not a number!')
        }

    }));

    it('hasOperator - "+"', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.hasOperator('+12')

        expect(res).toBe(true)

    }));

    it('hasOperator - "-"', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.hasOperator('-12')

        expect(res).toBe(true)

    }));

    it('hasOperator - "*"', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.hasOperator('*12')

        expect(res).toBe(true)

    }));

    it('hasOperator - "/"', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.hasOperator('/12')

        expect(res).toBe(true)

    }));

    it('hasOperator - it has not', inject([CalculatorService], (service: CalculatorService) => {

        const res = service.hasOperator('12')

        expect(res).toBe(false)

    }));

});

import { Injectable } from '@angular/core';
const clone = require('lodash.clone');

export interface Button {
    // type: 'operator' | 'number' | 'action',
    type: string,
    value: string
}

@Injectable()
export class CalculatorService {

    readonly buttons = [
        { type: 'number', value: '7' }, 
        { type: 'number', value: '8' },
        { type: 'number', value: '9' },
        { type: 'operator', value: '/' },
        { type: 'number', value: '4' },
        { type: 'number', value: '5' },
        { type: 'number', value: '6' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '1' },
        { type: 'number', value: '2' },
        { type: 'number', value: '3' },
        { type: 'operator', value: '-' },
        { type: 'number', value: '0', wide: true },
        { type: 'number', value: '.' },
        { type: 'operator', value: '+' },
        { type: 'action', value: 'C' },
        { type: 'action', value: '<' },
        { type: 'action', value: '=', wide: true },
    ]

    // TODO: add operators
    readonly keyHash = {
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        187: '=',
        189: '=',
    }

    // makeResult
    // -2 * 5 / 2 - 3 + 4 * 2
    calculateFormula(calculations: Button[]): string {

        const res = calculations
            // group by "/" and "*"
            // "12 + 4/2*2 + 3*3 - 2 "                      
            .reduce((prev, {value}) => {

                if (value === '+' || value === '-') {

                    return prev + ' ' + value + ' '
                }

                return prev + value;
            }, '')
            .trim()
            // ['12', '+', '4/2*2', '+', '3*2', '-', '2'] 
            .split(' ')
            // calculate groups
            // ['12', '+', '4', '+', '6', '-', '2'] 
            .map((item: string) => {

                // 1*3/4
                if (item.includes('/') || item.includes('*')) {

                    try {

                        return this.calculateDivMul(item)

                    } catch (err) {

                        throw err
                    }
                }

                return item;
            })
            // "12 +4 +6 -2"   
            .reduce((prev, curr) => (curr === '+' || curr === '-') ? prev + ' ' + curr : prev + curr, '')
            // ['12', '+4', '+6', '-2']   
            .split(' ')
            // 20
            .reduce((prev, curr) => {

                // plain number
                if (!this.hasOperator(curr)) {

                    // validate
                    this.validateNumber(curr)
                    // to Number
                    return Number(curr)
                }

                // e.g. +8
                // 8
                const value = curr.substring(1)
                // +
                const operator: any = curr[0]

                // validate
                this.validateNumber(value)

                return operator === '+' ? Number(prev) + Number(value) : Number(prev) - Number(value)

            }, 0)

            return `${res}`
    }

    calculateDivMul(item: string): string {

        // 4/2*2
        const intermediate = item
            // ['4', '/', '2', '*', '2']
            .split('')
            // "4 /2 *2"
            .reduce((prev, curr) => (curr === '*' || curr === '/') ? prev + ' ' + curr : prev + curr, '')
            .trim()
            // ['4', '/2', '*2']
            .split(' ')

        // check div 0
        if (intermediate.some(val => val === '/0')) {

            throw new Error('#DIV/0 error!')
        }

        // check if it starts with slash or star
        // e.g.: /4 or *4 is wrong
        const first = intermediate[0];
        if (isNaN(<any>first)) {

            // /8 on first position of intermediate
            if (first[0] === '/' || first[0] === '*') {

                throw new Error(`"${first}" is wrong!`)
            }
        }

        // 4
        const res = intermediate.reduce((prev, curr: string) => {

            // plain number
            if (!this.hasOperator(curr)) {

                // validate
                this.validateNumber(curr)
                // to Number
                return Number(curr)
            }

            // e.g. /8
            // 8
            const value = curr.substring(1)
            // /
            const operator: any = curr[0]

            // validate
            this.validateNumber(value)


            return operator === '/' ? Number(prev) / Number(value) : Number(prev) * Number(value)
        }, 0)

        return `${res}`
    }

    pickLastOneOperator(calculations): Button[] {

        return calculations.filter((val: Button, index, array: Button[]) => {

            if (val.type === 'operator') {

                if ((index + 1) in array && array[index + 1].type === 'operator') {

                    return false;
                }
            }
            return true;
        })
    }

    removeTrailingOperators(calculations: Button[]): Button[] {

        const list: Button[] = clone(calculations)

        if (list.length && list[list.length - 1].type === 'operator') {

            list.pop()

            return list;
        }

        return list;
    }


    formatCalculations(calculations: Button[]): string {

        if (calculations.length === 0) {
         
            return '0';
        }

        return calculations
            // group by "/" and "*"        
            // "12 + 4/2*2 + 3*3 - 2 "                      
            .reduce((prev, {value}) => {

                if (value === '+' || value === '-') {

                    return prev + ' ' + value + ' '
                }

                return prev + value;
            }, '')
            .trim()
            // ['12', '+', '4/2*2', '+', '3*2', '-', '2'] 
            .split(' ')
            // calculate groups
            // ['12', '+', '4', '+', '6', '-', '2'] 
            .map((item: string) => {

                // 1*3/4
                if (item.includes('/') || item.includes('*')) {

                    const tmp = item
                        .split('')
                        .reduce((prev, curr) => (curr === '*' || curr === '/') ? prev + ' ' + curr + ' ' : prev + curr, '')
                    
                    return `( ${tmp} )`
                }

                return item;
            })
            .reduce((prev, curr) => prev + ' ' + curr, '')
            .trim()

    }

    deleteStep(calculations: Button[]): Button[] {

        const list: Button[] = clone(calculations)

        if (list.length === 0) {
        
            return list;
        }

        list.pop()

        return list;
    }

    isDotVariantPresent(calculations: Button[], button: Button): boolean {

        const list: Button[] = clone(calculations)

        if (list.length === 0) {
         
            return false;
        }

        if (list.pop().value === '.') {

            if (button.value === '.' || button.type === 'operator') {

                return true;
            }
        }

        return false;
    }

    validateNumber(item: string) {

        if (isNaN(<any>item)) {

            throw new Error(`"${item}" is not a number!`)
        }
    }

    hasOperator(item: string) {

        return item.includes('+', 0) || item.includes('-', 0) || item.includes('*', 0) || item.includes('/', 0)
    }

    getButtonByValue(value: string) {

        return this.buttons.find(item => item.value === value)
    }

    containsOnlyNumber(calculations: Button[]) {

        return !calculations.some(val => val.type === 'operator')
    }

}

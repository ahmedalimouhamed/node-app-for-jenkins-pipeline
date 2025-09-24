const Calculator = require('../app/calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    })

    test('addition de deux nombres', () => {
        expect(calculator.add(2, 3)).toBe(5);
        expect(calculator.add(-1, 1)).toBe(0);
        expect(calculator.add(0, 0)).toBe(0);
    });

    test('soustraction de deux nombres', () => {
        expect(calculator.substract(5, 3)).toBe(2);
        expect(calculator.substract(0, 5)).toBe(-5);
    });

    test('multiplication de deux nombres', () => {
        expect(calculator.multiply(4, 5)).toBe(20);
        expect(calculator.multiply(0, 5)).toBe(0);
    });

    test('division de deux nombres', () => {
        expect(calculator.divide(10, 2)).toBe(5);
        expect(calculator.divide(5, 2)).toBe(2.5)
    });

    test('division par zéro génère une erreur', () => {
        expect(() => calculator.divide(5, 0)).toThrow('Division par zéro impossible');
    });

    test('puissance d\'un nombre', () => {
        expect(calculator.power(2, 3)).toBe(8);
        expect(calculator.power(5, 0)).toBe(1);
    });
});
class Calculator{

    add(a, b){
        return a + b;
    }

    substract(a, b){
        return a - b;
    }

    multiply(a, b){
        return a * b;
    }

    divide(a, b){
        if(b === 0){
            throw new Error('Division par zéro impossible');
        }
        return a / b;
    }

    power(base, exponent){
        return Math.pow(base, exponent);
    }
}

module.exports = Calculator;
export function generateValidCPF(): string {
    const randomDigits = () => Math.floor(Math.random() * 9) + 1;
  
    let cpf = Array.from({ length: 9 }, randomDigits).join('');
  
    function calculateDigit(cpfBase: string, factor: number): number {
      const sum = cpfBase
        .split('')
        .map((num, index) => parseInt(num) * (factor - index))
        .reduce((acc, val) => acc + val, 0);
  
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    }
  
    const firstDigit = calculateDigit(cpf, 10);
    const secondDigit = calculateDigit(cpf + firstDigit, 11);
  
    return `${cpf}${firstDigit}${secondDigit}`;
  }
  
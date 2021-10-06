// Programação Imperativa
const normal = (...x: number[]) => {
  let arr = [];

  for (let i = 0; i < x.length; i++) {
    const valor = x[i];
    if (valor > 0) {
      arr.push(valor);
    }
  }

  return arr;
};

// Orientação a Objetos
class MinhaClasse {
  constructor(private x: number[]) {
    Object.assign(MinhaClasse, x);
  }

  filtrar(): number[] {
    let arr: number[] = [];

    for (let i = 0; i < this.x.length; i++) {
      const valor = this.x[i];
      if (valor > 0) {
        arr.push(valor);
      }
    }

    return arr;
  }
}

// Orientação a Objetos
const oo = () => {
  const cls = new MinhaClasse([-5, -1, 0, 5, 10]);

  console.log(cls.filtrar());
};

// Programação Funcional
export const funcional = (...x: number[]): number[] => {
  return x.filter((v: number) => v > 0);
};

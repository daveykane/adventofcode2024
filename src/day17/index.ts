type Operand = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

class Computer {
  private pointer: number;
  private output: number[];
  private program: number[];
  private registers: { A: bigint; B: bigint; C: bigint };

  constructor(input: string, registerA?: bigint) {
    this.pointer = 0;
    this.output = [];
    this.registers = { A: registerA ?? BigInt(input.match(/Register A: (\d+)/)?.[1] ?? 0), B: 0n, C: 0n };
    this.program =
      input
        .match(/Program: (.+)/)?.[1]
        .split(",")
        .map(Number) ?? [];
  }

  get instructions() {
    return [
      (operand: Operand) => (this.registers.A = this.registers.A / BigInt(Math.pow(2, Number(this.combo(operand))))),
      (operand: Operand) => (this.registers.B = this.registers.B ^ BigInt(operand)),
      (operand: Operand) => (this.registers.B = this.combo(operand) % 8n),
      (operand: Operand) => (this.pointer = this.registers.A !== 0n ? operand : this.pointer + 2),
      (_operand: Operand) => (this.registers.B = this.registers.B ^ this.registers.C),
      (operand: Operand) => this.output.push(Number(this.combo(operand) % 8n)),
      (operand: Operand) => (this.registers.B = this.registers.A / BigInt(Math.pow(2, Number(this.combo(operand))))),
      (operand: Operand) => (this.registers.C = this.registers.A / BigInt(Math.pow(2, Number(this.combo(operand))))),
    ] as const;
  }

  combo(operand: Operand) {
    if (operand === 4) return this.registers.A;
    if (operand === 5) return this.registers.B;
    if (operand === 6) return this.registers.C;
    if (operand === 7) throw new Error("Reserved Operand");
    return BigInt(operand);
  }

  run() {
    while (this.pointer < this.program.length) {
      const opcode = this.program[this.pointer];
      this.instructions[opcode](this.program[this.pointer + 1] as Operand);
      if (opcode !== 3) this.pointer = this.pointer + 2;
    }
    return this.output.join(",");
  }

  getProgram() {
    return this.program;
  }

  reset(registerA: bigint) {
    this.pointer = 0;
    this.output = [];
    this.registers = { A: registerA, B: 0n, C: 0n };
  }
}

export const part1 = (input: string) => new Computer(input).run();
export const part2 = (input: string) => {
  let i = 1n;
  const computer = new Computer(input);
  const expected = computer.getProgram().join(",");

  while (true) {
    computer.reset(i);
    const result = computer.run();
    if (result === expected) return i;
    i = expected.endsWith(result) ? i * 8n : i + 1n;
  }
};

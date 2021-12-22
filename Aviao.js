class Aviao {
  constructor(codigo, qtd_poltronas) {
    this.codigo = codigo;
    this.poltronas = [];
    this.add_poltronas(qtd_poltronas);
  }

  qtd_poltronas_disponiveis() {
    return this.poltronas.length;
  }

  add_poltronas(qtd_poltronas) {
    const qtd_poltronas_int = Number(qtd_poltronas);
    for (let i = 1; i <= qtd_poltronas_int; i++) {
      this.poltronas.push(i);
    }
  }

  ocupar_poltronas(num_poltrona) {
    const num_poltrona_int = Number(num_poltrona);
    this.poltronas.splice(num_poltrona_int - 1, 1);
  }

  poltronas_disponiveis() {
    console.log(this.poltronas);
  }
}

export { Aviao };

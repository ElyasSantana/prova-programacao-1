class Aviao {
  constructor(codigo, qtd_poltronas) {
    this.codigo = codigo;
    this.qtd_poltronas = qtd_poltronas;
  }

  poltronas_disponiveis() {
    return this.qtd_poltronas;
  }
}

export { Aviao };

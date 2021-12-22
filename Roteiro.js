class Roteiro {
  constructor(
    codigo,
    origem = null,
    destino = null,
    aviao = null,
    horario = null
  ) {
    this.codigo = codigo;
    this.origem = origem;
    this.destino = destino;
    this.aviao = aviao;
    this.horario = horario;
  }

  informacoes_do_roteiro() {
    console.log(
      `Codigo Avião: ${this.aviao} ---- Código do Roteiro: ${this.codigo} \n Origem ${this.origem} --> Destino: ${this.destino}: Saída: ${this.horario}`
    );
  }
}

export { Roteiro };

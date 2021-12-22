import readline from 'readline-sync';
import { Roteiro } from './Roteiro.js';
import { Aviao } from './Aviao.js';
import { Cliente } from './Cliente.js';

let codigo_aviao = 1;
let codigo_roteiro = 1;
let codigo_cliente = 1;

let viagens = [];
let clientes = [];
let avioes = [];
let roteiros = [];

function menu() {
  console.log('-------MENU-------');
  console.log('1. Cadastrar novo roteiro ');
  console.log('2. Listar Roteiros ');
  console.log('3. Comprar nova passagem ');
  console.log('4. Passageiros por roteiro');
  console.log('5. Cadastrar avião');
  console.log('6. Listar aviões da companhia ');
  console.log('7. Passageiros por avião ');
}

/*----------------ControllerAvião----------------------------------------*/
function cadastrar_aviao() {
  let qtd_poltronas = readline.question(
    'Digite a quantidate de poltronas do avião: '
  );

  let aviao = new Aviao(codigo_aviao, qtd_poltronas);
  codigo_aviao++;
  return aviao;
}

function buscar_aviao(codigo_aviao) {
  let aviao = avioes.filter((aviao) => aviao.codigo === Number(codigo_aviao));
  return aviao;
}

function listar_avioes() {
  console.log('===========AVIÕES============');
  avioes.map((aviao) => {
    let qtd_poltronas = aviao.poltronas_disponiveis();
    console.log(
      `Código: ${aviao.codigo} -- Poltronas disponiveis ${qtd_poltronas}`
    );
  });
}

/* -----------------------ControllerRoteiros-----------------------------*/
function cadastrar_roteiro() {
  let origem = readline.question('Digite a cidade origem: ');
  let destino = readline.question('Digite a cidade destino: ');

  console.clear();
  listar_avioes();

  let codigo_aviao = readline.question('Digite o código do avião: ');
  let lista_avioes = buscar_aviao(codigo_aviao);
  readline.keyIn('Pressione espaço para continuar...');

  if (lista_avioes != 0) {
    console.clear();
    let horario = readline.question('Digite o horário (19hrs ou 19h:00): ');
    let roteiro = new Roteiro(
      codigo_roteiro,
      origem,
      destino,
      codigo_aviao,
      horario
    );
    codigo_roteiro++;
    return roteiro;
  } else {
    console.log('Não foi possivel cadastrar, código do avião inválido!');
    readline.keyIn('Pressione espaço para continuar...');
  }
}

function listar_roteiros() {
  console.log('===========ROTEIROS============');
  roteiros.map((roteiro) => {
    roteiro.informacoes_do_roteiro();
  });
}

function buscar_roteiro(codigo_roteiro) {
  let roteiro = roteiros.filter(
    (roteiro) => roteiro.codigo === Number(codigo_roteiro)
  );
  return roteiro;
}

/*---------------ControllerClientes------------------------ */
function comprar_passagem() {
  let nome = readline.question('Digite o nome do cliente: ');

  console.clear();
  listar_roteiros();

  let roteiro = readline.question('Digite o código do roteiro desejado: ');
  let lista_roteiros = buscar_roteiro(roteiro);

  if (lista_roteiros.length !== 0) {
    let numero_poltrona = readline.question(
      'Digite o número da poltrona desejada: '
    );
    let cliente = new Cliente(
      codigo_cliente,
      nome,
      lista_roteiros[0].codigo,
      lista_roteiros[0].aviao,
      numero_poltrona
    );
    codigo_cliente++;
    return cliente;
  } else {
    console.log('Não foi possivel cadastrar, código do roteiro inválido!');
    readline.keyIn('Pressione espaço para continuar...');
  }
}

function buscar_passageiros_por_viagem(codigo_roteiro) {
  let lista_passageiros = viagens.filter(
    (roteiro) => roteiro.roteiro === Number(codigo_roteiro)
  );
  lista_passageiros.map((passageiro) => {
    console.clear();
    console.log('=========Informações do Cliente=========');
    console.log(
      `Código Cliente: ${passageiro.codigo} : Código do Avião: ${passageiro.aviao}`
    );
    console.log(
      `Nome: ${passageiro.nome}  : número da poltrona -- ${passageiro.num_poltrona}`
    );
    console.log(
      '-----------------------------------------------------------------'
    );
  });
}

function buscar_passageiros_por_aviao(codigo_aviao) {
  let lista_passageiros = viagens.filter(
    (roteiro) => roteiro.aviao === Number(codigo_aviao)
  );
  lista_passageiros.map((passageiro) => {
    console.clear();
    console.log('=========Informações do Cliente=========');
    console.log(
      `Código Cliente: ${passageiro.codigo} : Código do Avião: ${passageiro.aviao}`
    );
    console.log(
      `Nome: ${passageiro.nome}  : número da poltrona -- ${passageiro.num_poltrona}`
    );
    console.log(
      '-----------------------------------------------------------------'
    );
  });
}

console.log('------------------IFViagens------------------');
menu();
var opcao = readline.question('Digite sua opção: ');

while (opcao != 0) {
  switch (opcao) {
    case '1':
      if (avioes.length === 0) {
        console.log(
          '\nNão tem aviões disponíveis para cadastrar novos roteiros! \n'
        );
        readline.keyIn('Pressione espaço para continuar...');
      } else {
        let roteiro = cadastrar_roteiro();
        roteiros.push(roteiro);
      }
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '2':
      if (roteiros.length != 0) {
        listar_roteiros();
      } else {
        console.log('Nenhum roteiro encontrado!');
      }
      readline.keyIn('Pressione espaço para continuar...');
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '3':
      if (roteiros.length === 0) {
        console.log(
          '\nNão tem roteiros disponíveis para comprar passagens! \n'
        );
        readline.keyIn('Pressione espaço para continuar...');
      } else {
        let cliente = comprar_passagem();
        clientes.push(cliente);
        viagens.push(cliente);
      }
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '4':
      if (viagens.length === 0) {
        console.log('Não temos passagens compradas no sistema.');
      } else {
        let codigo_roteiro = readline.question('Digite o código do roteiro: ');
        buscar_passageiros_por_viagem(codigo_roteiro);
      }
      readline.keyIn('Pressione espaço para continuar...');
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '5':
      let aviao = cadastrar_aviao();
      avioes.push(aviao);
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '6':
      listar_avioes();
      readline.keyIn('Pressione espaço para continuar...');
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    case '7':
      if (viagens.length === 0) {
        console.log('Não temos passagens compradas no sistema.');
      } else {
        let codigo_aviao = readline.question('Digite o código do avião: ');
        buscar_passageiros_por_aviao(codigo_aviao);
      }
      readline.keyIn('Pressione espaço para continuar...');
      console.clear();
      menu();
      var opcao = readline.question('Digite sua opção: ');
      break;
    default:
      break;
  }
}

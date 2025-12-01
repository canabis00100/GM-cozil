// Gerenciador de Estado do Sistema PCM
// Controla modo GLOBAL vs INDIVIDUAL e atualizações automáticas

import { obterDadosGlobais, obterDadosProduto, buscarProduto } from './data/mockData.js';

class PCMState {
  constructor() {
    this.modo = 'GLOBAL'; // 'GLOBAL' ou 'INDIVIDUAL'
    this.codigoProdutoAtual = null;
    this.dadosAtuais = null;
    this.listeners = [];
    this.intervalId = null;
    this.autoUpdateInterval = 30000; // 30 segundos
  }

  // Adiciona listener para mudanças de estado
  onStateChange(callback) {
    this.listeners.push(callback);
  }

  // Notifica todos os listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.modo, this.dadosAtuais));
  }

  // Define modo GLOBAL
  setModoGlobal() {
    this.modo = 'GLOBAL';
    this.codigoProdutoAtual = null;
    this.dadosAtuais = obterDadosGlobais();
    this.notifyListeners();
  }

  // Define modo INDIVIDUAL com código de produto
  setModoIndividual(codigo) {
    const produto = buscarProduto(codigo);
    if (!produto) {
      console.warn(`Produto com código ${codigo} não encontrado`);
      return false;
    }

    this.modo = 'INDIVIDUAL';
    this.codigoProdutoAtual = codigo;
    this.dadosAtuais = obterDadosProduto(codigo);
    this.notifyListeners();
    return true;
  }

  // Busca produto e atualiza estado
  buscarProduto(codigo) {
    if (!codigo || codigo.trim() === '') {
      this.setModoGlobal();
      return;
    }

    const sucesso = this.setModoIndividual(codigo.trim());
    if (!sucesso) {
      // Produto não encontrado, mantém modo global
      this.setModoGlobal();
    }
  }

  // Inicia atualização automática
  iniciarAutoUpdate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Atualiza imediatamente
    this.atualizarDados();

    // Configura intervalo de atualização
    this.intervalId = setInterval(() => {
      this.atualizarDados();
    }, this.autoUpdateInterval);
  }

  // Para atualização automática
  pararAutoUpdate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Atualiza dados baseado no modo atual
  atualizarDados() {
    if (this.modo === 'GLOBAL') {
      this.dadosAtuais = obterDadosGlobais();
    } else if (this.codigoProdutoAtual) {
      this.dadosAtuais = obterDadosProduto(this.codigoProdutoAtual);
    }
    this.notifyListeners();
  }

  // Obtém dados atuais
  getDados() {
    return this.dadosAtuais;
  }

  // Obtém modo atual
  getModo() {
    return this.modo;
  }

  // Obtém código do produto atual
  getCodigoProduto() {
    return this.codigoProdutoAtual;
  }
}

// Instância singleton
const pcmState = new PCMState();

export default pcmState;


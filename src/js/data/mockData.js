// Dados fictícios simulando planilhas do Google Sheets
// Estrutura de dados para PCM (Planejamento e Controle de Materiais)

// Produtos com informações completas
export const produtos = [
  {
    codigo: "PCM-001",
    nome: "Parafuso M6x20 Inox",
    categoria: "Fixadores",
    estoque: 1250,
    comprometido: 320,
    disponivel: 930,
    pontoPedido: 500,
    valorUnitario: 0.85,
    fornecedor: "Fornecedor A",
    tempoDuracao: 45, // dias
    solicitacaoCompra: false,
    pedidoCompra: false,
    historicoCompras: [
      { mes: "Jan", quantidade: 800, valor: 680.00, dataEntrega: "2024-01-15", atraso: 0, numeroPedido: "PC-001", numeroSolicitacao: "SC-001" },
      { mes: "Fev", quantidade: 600, valor: 510.00, dataEntrega: "2024-02-20", atraso: 5, numeroPedido: "PC-002", numeroSolicitacao: "SC-002" },
      { mes: "Mar", quantidade: 900, valor: 765.00, dataEntrega: "2024-03-10", atraso: 0, numeroPedido: "PC-003", numeroSolicitacao: "SC-003" },
      { mes: "Abr", quantidade: 750, valor: 637.50, dataEntrega: "2024-04-18", atraso: 3, numeroPedido: "PC-004", numeroSolicitacao: "SC-004" },
    ],
    numeroSolicitacao: "SC-005",
    numeroPedido: "PC-005",
    consumoMedio: 25, // unidades/dia
  },
  {
    codigo: "PCM-002",
    nome: "Chapa de Aço 3mm",
    categoria: "Matéria Prima",
    estoque: 450,
    comprometido: 180,
    disponivel: 270,
    pontoPedido: 300,
    valorUnitario: 45.50,
    fornecedor: "Fornecedor B",
    tempoDuracao: 12,
    solicitacaoCompra: true,
    pedidoCompra: false,
    numeroSolicitacao: "SC-101",
    numeroPedido: null,
    historicoCompras: [
      { mes: "Jan", quantidade: 200, valor: 9100.00, dataEntrega: "2024-01-25", atraso: 10, numeroPedido: "PC-101", numeroSolicitacao: "SC-101" },
      { mes: "Fev", quantidade: 150, valor: 6825.00, dataEntrega: "2024-02-28", atraso: 8, numeroPedido: "PC-102", numeroSolicitacao: "SC-102" },
      { mes: "Mar", quantidade: 180, valor: 8190.00, dataEntrega: "2024-03-22", atraso: 7, numeroPedido: "PC-103", numeroSolicitacao: "SC-103" },
      { mes: "Abr", quantidade: 220, valor: 10010.00, dataEntrega: "2024-04-30", atraso: 5, numeroPedido: "PC-104", numeroSolicitacao: "SC-104" },
    ],
    consumoMedio: 15,
  },
  {
    codigo: "PCM-003",
    nome: "Tinta Epóxi Branca",
    categoria: "Químicos",
    estoque: 85,
    comprometido: 30,
    disponivel: 55,
    pontoPedido: 100,
    valorUnitario: 125.00,
    fornecedor: "Fornecedor C",
    tempoDuracao: 8,
    solicitacaoCompra: false,
    pedidoCompra: true,
    numeroSolicitacao: null,
    numeroPedido: "PC-201",
    historicoCompras: [
      { mes: "Jan", quantidade: 50, valor: 6250.00, dataEntrega: "2024-01-10", atraso: 0, numeroPedido: "PC-201", numeroSolicitacao: "SC-201" },
      { mes: "Fev", quantidade: 60, valor: 7500.00, dataEntrega: "2024-02-12", atraso: 2, numeroPedido: "PC-202", numeroSolicitacao: "SC-202" },
      { mes: "Mar", quantidade: 45, valor: 5625.00, dataEntrega: "2024-03-08", atraso: 0, numeroPedido: "PC-203", numeroSolicitacao: "SC-203" },
      { mes: "Abr", quantidade: 70, valor: 8750.00, dataEntrega: "2024-04-15", atraso: 0, numeroPedido: "PC-204", numeroSolicitacao: "SC-204" },
    ],
    consumoMedio: 7,
  },
  {
    codigo: "PCM-004",
    nome: "Rolamento 6205",
    categoria: "Componentes",
    estoque: 320,
    comprometido: 95,
    disponivel: 225,
    pontoPedido: 200,
    valorUnitario: 28.90,
    fornecedor: "Fornecedor A",
    tempoDuracao: 32,
    solicitacaoCompra: false,
    pedidoCompra: false,
    numeroSolicitacao: null,
    numeroPedido: null,
    historicoCompras: [
      { mes: "Jan", quantidade: 150, valor: 4335.00, dataEntrega: "2024-01-18", atraso: 3, numeroPedido: "PC-301", numeroSolicitacao: "SC-301" },
      { mes: "Fev", quantidade: 120, valor: 3468.00, dataEntrega: "2024-02-14", atraso: 0, numeroPedido: "PC-302", numeroSolicitacao: "SC-302" },
      { mes: "Mar", quantidade: 180, valor: 5202.00, dataEntrega: "2024-03-20", atraso: 5, numeroPedido: "PC-303", numeroSolicitacao: "SC-303" },
      { mes: "Abr", quantidade: 100, valor: 2890.00, dataEntrega: "2024-04-12", atraso: 0, numeroPedido: "PC-304", numeroSolicitacao: "SC-304" },
    ],
    consumoMedio: 7,
  },
  {
    codigo: "PCM-005",
    nome: "Solda Eletrodo 3.25mm",
    categoria: "Soldagem",
    estoque: 520,
    comprometido: 200,
    disponivel: 320,
    pontoPedido: 400,
    valorUnitario: 12.50,
    fornecedor: "Fornecedor D",
    tempoDuracao: 26,
    solicitacaoCompra: false,
    pedidoCompra: false,
    numeroSolicitacao: null,
    numeroPedido: null,
    historicoCompras: [
      { mes: "Jan", quantidade: 300, valor: 3750.00, dataEntrega: "2024-01-12", atraso: 0, numeroPedido: "PC-401", numeroSolicitacao: "SC-401" },
      { mes: "Fev", quantidade: 250, valor: 3125.00, dataEntrega: "2024-02-15", atraso: 0, numeroPedido: "PC-402", numeroSolicitacao: "SC-402" },
      { mes: "Mar", quantidade: 400, valor: 5000.00, dataEntrega: "2024-03-10", atraso: 0, numeroPedido: "PC-403", numeroSolicitacao: "SC-403" },
      { mes: "Abr", quantidade: 350, valor: 4375.00, dataEntrega: "2024-04-18", atraso: 0, numeroPedido: "PC-404", numeroSolicitacao: "SC-404" },
    ],
    consumoMedio: 12,
  },
];

// Fornecedores com histórico de desempenho
export const fornecedores = [
  {
    nome: "Fornecedor A",
    totalPedidos: 45,
    pedidosAtrasados: 8,
    taxaPontualidade: 82.2,
    tempoMedioEntrega: 12,
    avaliacao: 4.2,
    produtos: ["PCM-001", "PCM-004"],
  },
  {
    nome: "Fornecedor B",
    totalPedidos: 32,
    pedidosAtrasados: 15,
    taxaPontualidade: 53.1,
    tempoMedioEntrega: 18,
    avaliacao: 2.8,
    produtos: ["PCM-002"],
  },
  {
    nome: "Fornecedor C",
    totalPedidos: 28,
    pedidosAtrasados: 3,
    taxaPontualidade: 89.3,
    tempoMedioEntrega: 8,
    avaliacao: 4.7,
    produtos: ["PCM-003"],
  },
  {
    nome: "Fornecedor D",
    totalPedidos: 40,
    pedidosAtrasados: 2,
    taxaPontualidade: 95.0,
    tempoMedioEntrega: 10,
    avaliacao: 4.9,
    produtos: ["PCM-005"],
  },
];

// Função para buscar produto por código
export function buscarProduto(codigo) {
  return produtos.find(p => p.codigo.toLowerCase() === codigo.toLowerCase());
}

// Função para obter dados globais (soma de tudo)
export function obterDadosGlobais() {
  const totalEstoque = produtos.reduce((sum, p) => sum + p.estoque, 0);
  const totalComprometido = produtos.reduce((sum, p) => sum + p.comprometido, 0);
  const totalDisponivel = produtos.reduce((sum, p) => sum + p.disponivel, 0);
  const valorTotalEstoque = produtos.reduce((sum, p) => sum + (p.estoque * p.valorUnitario), 0);
  const totalPedidosCompra = produtos.filter(p => p.pedidoCompra).length;
  const totalSolicitacoes = produtos.filter(p => p.solicitacaoCompra).length;
  const produtosAbaixoPontoPedido = produtos.filter(p => p.disponivel < p.pontoPedido).length;

  // Dados de consumo mensal (últimos 6 meses)
  const consumoMensal = ["Out", "Nov", "Dez", "Jan", "Fev", "Mar"].map((mes, idx) => {
    const valor = produtos.reduce((sum, p) => {
      const historico = p.historicoCompras.find(h => h.mes === mes);
      return sum + (historico ? historico.quantidade : Math.random() * 1000);
    }, 0);
    return { mes, valor: Math.round(valor) };
  });

  // Dados de compras mensais
  const comprasMensais = ["Out", "Nov", "Dez", "Jan", "Fev", "Mar"].map((mes) => {
    const valor = produtos.reduce((sum, p) => {
      const historico = p.historicoCompras.find(h => h.mes === mes);
      return sum + (historico ? historico.valor : 0);
    }, 0);
    return { mes, valor: Math.round(valor) };
  });

  // Atrasos por fornecedor
  const atrasosFornecedores = fornecedores.map(f => ({
    nome: f.nome,
    atrasos: f.pedidosAtrasados,
    total: f.totalPedidos,
    taxa: f.taxaPontualidade,
  }));

  // Produtos críticos (abaixo do ponto de pedido)
  const produtosCriticos = produtos
    .filter(p => p.disponivel < p.pontoPedido)
    .map(p => ({
      codigo: p.codigo,
      nome: p.nome,
      disponivel: p.disponivel,
      pontoPedido: p.pontoPedido,
    }));

  // Top 10 produtos mais consumidos (ordenados por consumo médio)
  const topProdutosConsumidos = [...produtos]
    .sort((a, b) => b.consumoMedio - a.consumoMedio)
    .slice(0, 10)
    .map(p => ({
      codigo: p.codigo,
      nome: p.nome,
      categoria: p.categoria,
      consumo: p.consumoMedio * 30, // consumo mensal estimado
      estoque: p.estoque,
    }));

  // Tendência de estoque (últimos 12 meses)
  const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const tendenciaEstoque = {
    meses: meses,
    total: meses.map(() => totalEstoque + Math.floor(Math.random() * 2000 - 1000)),
    disponivel: meses.map(() => totalDisponivel + Math.floor(Math.random() * 1500 - 750)),
  };

  // Lead Time médio por fornecedor (últimos 12 meses)
  const leadTimeFornecedores = meses.map(() => 12 + Math.floor(Math.random() * 8));

  // Distribuição do estoque por categoria
  const distribuicaoCategoria = produtos.reduce((acc, p) => {
    acc[p.categoria] = (acc[p.categoria] || 0) + p.estoque;
    return acc;
  }, {});
  const distribuicaoCategoriaArray = Object.entries(distribuicaoCategoria).map(([cat, qtd]) => ({
    categoria: cat,
    quantidade: qtd,
    percentual: Math.round((qtd / totalEstoque) * 100),
  }));

  // Itens próximos do ponto de pedido (disponível < ponto de pedido * 1.2)
  const itensProximosPonto = produtos
    .filter(p => p.disponivel < p.pontoPedido * 1.2 && p.disponivel >= p.pontoPedido * 0.8)
    .map(p => ({
      codigo: p.codigo,
      disponivel: p.disponivel,
      pontoPedido: p.pontoPedido,
    }));

  // Movimentação do estoque (entradas e saídas)
  const movimentacaoEstoque = {
    meses: meses,
    entradas: meses.map(() => Math.floor(Math.random() * 500 + 1000)),
    saidas: meses.map(() => Math.floor(Math.random() * 400 + 700)),
  };

  return {
    totalEstoque,
    totalComprometido,
    totalDisponivel,
    valorTotalEstoque,
    totalPedidosCompra,
    totalSolicitacoes,
    produtosAbaixoPontoPedido,
    consumoMensal,
    comprasMensais,
    atrasosFornecedores,
    produtosCriticos,
    topProdutosConsumidos,
    tendenciaEstoque,
    leadTimeFornecedores,
    distribuicaoCategoria: distribuicaoCategoriaArray,
    itensProximosPonto,
    movimentacaoEstoque,
    totalProdutos: produtos.length,
  };
}

// Função para obter dados de um produto específico
export function obterDadosProduto(codigo) {
  const produto = buscarProduto(codigo);
  if (!produto) return null;

  const fornecedor = fornecedores.find(f => f.produtos.includes(produto.codigo));
  
  // Curva de consumo (últimos 6 meses)
  const curvaConsumo = produto.historicoCompras.map(h => ({
    mes: h.mes,
    quantidade: h.quantidade,
  }));

  // Histórico de entregas
  const historicoEntregas = produto.historicoCompras.map(h => ({
    mes: h.mes,
    dataEntrega: h.dataEntrega,
    atraso: h.atraso,
    quantidade: h.quantidade,
  }));

  // Estatísticas do fornecedor
  const statsFornecedor = fornecedor ? {
    nome: fornecedor.nome,
    taxaPontualidade: fornecedor.taxaPontualidade,
    tempoMedioEntrega: fornecedor.tempoMedioEntrega,
    avaliacao: fornecedor.avaliacao,
    totalPedidos: fornecedor.totalPedidos,
    pedidosAtrasados: fornecedor.pedidosAtrasados,
  } : null;

  // Lead Time do fornecedor (últimos 12 meses)
  const leadTimeFornecedor = produto.historicoCompras.map(h => h.atraso + (fornecedor ? fornecedor.tempoMedioEntrega : 10));

  // Curva de consumo dos últimos 12 meses (expandir com dados simulados)
  const meses12 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const curvaConsumo12Meses = meses12.map((mes, idx) => {
    const historico = produto.historicoCompras.find(h => h.mes === mes);
    return historico ? historico.quantidade : Math.floor(produto.consumoMedio * 30 * (0.8 + Math.random() * 0.4));
  });

  // Movimentação do estoque do produto (expandir para 12 meses)
  const movimentacaoProduto = {
    meses: meses12,
    entradas: meses12.map((mes, idx) => {
      const historico = produto.historicoCompras.find(h => h.mes === mes);
      return historico ? historico.quantidade : Math.floor(produto.consumoMedio * 30 * 1.2);
    }),
    saidas: meses12.map((mes, idx) => {
      const historico = produto.historicoCompras.find(h => h.mes === mes);
      return historico ? Math.floor(historico.quantidade * 0.7) : Math.floor(produto.consumoMedio * 30);
    }),
  };

  return {
    produto,
    fornecedor: statsFornecedor,
    curvaConsumo,
    curvaConsumo12Meses,
    historicoEntregas,
    leadTimeFornecedor,
    movimentacaoProduto,
    tempoDuracaoEstimado: Math.floor(produto.disponivel / produto.consumoMedio),
  };
}


// Atualizador de componentes visuais baseado no estado PCM
// Atualiza métricas, gráficos e tabelas conforme modo GLOBAL ou INDIVIDUAL

let chartInstances = {
  chart01: null,
  chart02: null,
  chart03: null,
};

// Atualiza os cards de métricas
export function atualizarMetricas(dados, modo) {
  if (modo === 'GLOBAL') {
    if (dados) atualizarMetricasGlobal(dados);
    mostrarSecaoGlobal();
  } else {
    // Modo INDIVIDUAL - sempre mostra seção, mesmo sem dados
    if (dados) atualizarMetricasIndividual(dados);
    mostrarSecaoIndividual();
    // Quando mostra seção individual, força atualização dos gráficos
    setTimeout(() => {
      atualizarGraficosIndividual(dados || {});
    }, 300);
  }
}

// Mostra/esconde seções
function mostrarSecaoGlobal() {
  const secaoGlobal = document.getElementById('secao-global');
  const secaoIndividual = document.getElementById('secao-individual');
  
  if (secaoGlobal) secaoGlobal.classList.remove('hidden');
  if (secaoIndividual) secaoIndividual.classList.add('hidden');
}

function mostrarSecaoIndividual() {
  const secaoGlobal = document.getElementById('secao-global');
  const secaoIndividual = document.getElementById('secao-individual');
  
  if (secaoGlobal) secaoGlobal.classList.add('hidden');
  if (secaoIndividual) secaoIndividual.classList.remove('hidden');
  
  // FORÇA atualização imediata das estatísticas PCM
  // Usa múltiplos timeouts para garantir que o DOM está pronto
  const atualizarDados = () => {
    atualizarGraficosIndividual({});
  };
  
  // Atualiza imediatamente
  atualizarDados();
  
  // Atualiza em múltiplos momentos para garantir
  setTimeout(atualizarDados, 50);
  setTimeout(atualizarDados, 200);
  setTimeout(atualizarDados, 500);
  setTimeout(atualizarDados, 1000);
  setTimeout(atualizarDados, 2000);
}

function atualizarMetricasGlobal(dados) {
  const metricCards = document.querySelectorAll('#secao-global [data-metric]');
  
  metricCards.forEach(card => {
    const metricType = card.getAttribute('data-metric');
    const valueElement = card.querySelector('[data-value]');
    const labelElement = card.querySelector('[data-label]');
    
    if (!valueElement) return;

    switch(metricType) {
      case 'produtos-totais':
        if (valueElement) valueElement.textContent = dados.totalProdutos || 0;
        if (labelElement) labelElement.textContent = 'Produtos Totais';
        break;
      case 'estoque-total':
        if (valueElement) valueElement.textContent = dados.totalEstoque.toLocaleString('pt-BR');
        if (labelElement) labelElement.textContent = 'Estoque Total';
        break;
      case 'solicitacoes-abertas':
        if (valueElement) valueElement.textContent = dados.totalSolicitacoes || 0;
        if (labelElement) labelElement.textContent = 'Solicitações Abertas';
        break;
      case 'pedidos-abertos':
        if (valueElement) valueElement.textContent = dados.totalPedidosCompra || 0;
        if (labelElement) labelElement.textContent = 'Pedidos Abertos';
        break;
    }
  });
}

function atualizarMetricasIndividual(dados) {
  if (!dados.produto) return;

  const produto = dados.produto;
  const fornecedor = dados.fornecedor;
  const metricCards = document.querySelectorAll('#secao-individual [data-metric]');
  
  metricCards.forEach(card => {
    const metricType = card.getAttribute('data-metric');
    const valueElement = card.querySelector('[data-value]');
    const labelElement = card.querySelector('[data-label]');
    
    if (!valueElement) return;

    switch(metricType) {
      case 'estoque-atual':
        if (valueElement) valueElement.textContent = produto.estoque.toLocaleString('pt-BR');
        const changeEstoque = card.querySelector('[data-change]');
        if (changeEstoque) {
          const mudanca = (Math.random() * 5 + 1).toFixed(2);
          changeEstoque.textContent = `+${mudanca}%`;
          changeEstoque.className = "text-xs font-medium text-success-600 dark:text-success-400";
        }
        break;
      case 'real-disponivel':
        if (valueElement) valueElement.textContent = produto.disponivel.toLocaleString('pt-BR');
        const changeDisponivel = card.querySelector('[data-change]');
        if (changeDisponivel) {
          const mudanca = (Math.random() * 5 + 1).toFixed(2);
          changeDisponivel.textContent = `+${mudanca}%`;
          changeDisponivel.className = "text-xs font-medium text-success-600 dark:text-success-400";
        }
        break;
      case 'consumo-medio-mensal':
        const consumoMedio = produto.consumoMedio * 30 || 0;
        if (valueElement) valueElement.textContent = `${Math.round(consumoMedio).toLocaleString('pt-BR')} un`;
        const changeConsumo = card.querySelector('[data-change]');
        if (changeConsumo) {
          const mudanca = (Math.random() * 3 - 1).toFixed(2);
          const isPositive = mudanca > 0;
          changeConsumo.textContent = `${isPositive ? '+' : ''}${mudanca}%`;
          changeConsumo.className = `text-xs font-medium ${isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`;
        }
        break;
      case 'duracao-estimada':
        const dias = dados.tempoDuracaoEstimado || 0;
        if (valueElement) valueElement.textContent = `${dias} dias`;
        const changeDuracao = card.querySelector('[data-change]');
        if (changeDuracao) {
          const mudanca = (Math.random() * 5 + 1).toFixed(2);
          changeDuracao.textContent = `+${mudanca}%`;
          changeDuracao.className = "text-xs font-medium text-success-600 dark:text-success-400";
        }
        break;
      case 'fornecedor-info':
        const nomeFornecedor = fornecedor ? fornecedor.nome : 'Não informado';
        const fornecedorEl = card.querySelector('[data-value-fornecedor]');
        const leadTimeEl = card.querySelector('[data-value-lead-time]');
        const ultimaEntregaEl = card.querySelector('[data-value-ultima-entrega]');
        const ultimoAtrasoEl = card.querySelector('[data-value-ultimo-atraso]');
        const mediaAtrasoEl = card.querySelector('[data-value-media-atraso]');
        
        if (fornecedorEl) fornecedorEl.textContent = nomeFornecedor;
        if (leadTimeEl) leadTimeEl.textContent = fornecedor ? `${fornecedor.tempoMedioEntrega} dias` : '-';
        
        if (dados.historicoEntregas && dados.historicoEntregas.length > 0) {
          const ultimaEntrega = dados.historicoEntregas[dados.historicoEntregas.length - 1];
          if (ultimaEntregaEl) ultimaEntregaEl.textContent = ultimaEntrega.dataEntrega ? new Date(ultimaEntrega.dataEntrega).toLocaleDateString('pt-BR') : '-';
          if (ultimoAtrasoEl) ultimoAtrasoEl.textContent = ultimaEntrega.atraso > 0 ? `${ultimaEntrega.atraso} dias` : 'No prazo';
          
          // Calcula média de atraso dos últimos 6 meses
          const ultimos6 = dados.historicoEntregas.slice(-6);
          const atrasos = ultimos6.filter(h => h.atraso > 0).map(h => h.atraso);
          const mediaAtraso = atrasos.length > 0 ? (atrasos.reduce((a, b) => a + b, 0) / atrasos.length).toFixed(1) : 0;
          if (mediaAtrasoEl) mediaAtrasoEl.textContent = mediaAtraso > 0 ? `${mediaAtraso} dias` : 'Sem atrasos';
        } else {
          if (ultimaEntregaEl) ultimaEntregaEl.textContent = '-';
          if (ultimoAtrasoEl) ultimoAtrasoEl.textContent = '-';
          if (mediaAtrasoEl) mediaAtrasoEl.textContent = '-';
        }
        break;
      case 'solicitacao-compra':
        const temSolicitacao = produto.solicitacaoCompra || false;
        const numeroSolicitacao = produto.numeroSolicitacao || null;
        if (valueElement) valueElement.textContent = temSolicitacao ? 'SIM' : 'NÃO';
        const numeroSolicEl = card.querySelector('[data-value-numero]');
        if (numeroSolicEl) numeroSolicEl.textContent = numeroSolicitacao ? `#${numeroSolicitacao}` : '';
        break;
      case 'pedido-compra':
        const temPedido = produto.pedidoCompra || false;
        const numeroPedido = produto.numeroPedido || null;
        if (valueElement) valueElement.textContent = temPedido ? 'SIM' : 'NÃO';
        const numeroPedidoEl = card.querySelector('[data-value-numero]');
        if (numeroPedidoEl) numeroPedidoEl.textContent = numeroPedido ? `#${numeroPedido}` : '';
        break;
    }
  });
}

// Atualiza os gráficos
export function atualizarGraficos(dados, modo) {
  if (modo === 'GLOBAL') {
    if (dados) atualizarGraficosGlobal(dados);
  } else {
    // Sempre atualiza gráficos e tabela individual, mesmo sem dados
    atualizarGraficosIndividual(dados || {});
  }
}

// Atualiza tabelas globais
function atualizarTabelasGlobal(dados) {
  atualizarTabelaPedidosSolicitacoes(dados);
}

function atualizarGraficosGlobal(dados) {
  // Gráfico 03 - Compras vs Consumo Mensal (full width)
  if (dados.comprasMensais && dados.consumoMensal && window.ApexCharts) {
    atualizarChart03(
      dados.comprasMensais.map(c => c.valor),
      dados.consumoMensal.map(c => c.valor),
      dados.comprasMensais.map(c => c.mes),
      'Compras',
      'Consumo'
    );
  }

  // Gráfico 01 - Consumo Mensal Geral (bar)
  if (dados.consumoMensal && window.ApexCharts) {
    const consumoData = dados.consumoMensal.map(c => c.valor);
    const meses = dados.consumoMensal.map(c => c.mes);
    atualizarChart01(consumoData, meses, 'Consumo Mensal Geral');
  }

  // Gráfico 08 - Distribuição do Estoque por Categoria (donut)
  if (dados.distribuicaoCategoria && window.ApexCharts) {
    atualizarChart08(dados.distribuicaoCategoria);
  }

  // Gráfico 13 - Ranking de Fornecedores (horizontal bar)
  if (dados.atrasosFornecedores && window.ApexCharts) {
    atualizarChart13(dados.atrasosFornecedores);
  }
}

function atualizarGraficosIndividual(dados) {
  const produto = dados.produto;

  // Atualiza gráficos individuais no estilo SaaS
  if (window.ApexCharts) {
    atualizarChartIndividual01(produto);
    atualizarChartIndividual02(produto);
    atualizarChartIndividual03(produto);
    atualizarChartIndividual04(produto);
    atualizarChartIndividual05(produto);
  }

  // Atualiza tabela e atividades
  atualizarTabelaHistoricoComprasIndividual(produto);
  atualizarAtividadesIndividual(produto);
  
  // Atualiza card informativo
  atualizarCardInformativoIndividual(produto);
}

// Atualiza Chart 01 (Bar Chart - Consumo Mensal)
function atualizarChart01(data, categories, title) {
  const chartElement = document.querySelector("#chartOne");
  if (!chartElement) return;

  const theme = getThemeColors();
  const seriesName = title || "Consumo Mensal";

  // Tenta atualizar se já existe
  if (window.chartOneInstance) {
    window.chartOneInstance.updateSeries([{ name: seriesName, data }]);
    window.chartOneInstance.updateOptions({ 
      xaxis: { 
        categories,
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      yaxis: {
        title: {
          style: {
            color: theme.textColor,
          },
        },
        labels: {
          formatter: function (val) {
            return Math.floor(val).toLocaleString('pt-BR');
          },
          style: {
            colors: theme.textColor,
          },
        },
      },
      grid: {
        borderColor: theme.gridColor,
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
    return;
  }

  // Se não existe, aguarda um pouco e tenta novamente
  setTimeout(() => {
    if (window.chartOneInstance) {
      window.chartOneInstance.updateSeries([{ name: seriesName, data }]);
      window.chartOneInstance.updateOptions({ 
        xaxis: { 
          categories,
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        yaxis: {
          title: {
            style: {
              color: theme.textColor,
            },
          },
          labels: {
            formatter: function (val) {
              return Math.floor(val).toLocaleString('pt-BR');
            },
            style: {
              colors: theme.textColor,
            },
          },
        },
        grid: {
          borderColor: theme.gridColor,
        },
        tooltip: {
          theme: theme.tooltipTheme,
        },
      });
    }
  }, 500);
}

// Atualiza Chart 02 (Radial Chart)
function atualizarChart02(value, label) {
  const chartElement = document.querySelector("#chartTwo");
  if (!chartElement) return;

  // Tenta atualizar se já existe
  if (window.chartTwoInstance) {
    window.chartTwoInstance.updateSeries([value]);
    return;
  }

  // Se não existe, aguarda um pouco e tenta novamente
  setTimeout(() => {
    if (window.chartTwoInstance) {
      window.chartTwoInstance.updateSeries([value]);
    }
  }, 500);
}

// Atualiza Chart 03 (Area Chart)
function atualizarChart03(series1, series2, categories, name1, name2) {
  const chartElement = document.querySelector("#chartThree");
  if (!chartElement) return;

  // Detecta tema atual
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#E5E7EB' : '#6B7280';
  const gridColor = isDark ? '#374151' : '#E5E7EB';
  const tooltipTheme = isDark ? 'dark' : 'light';
  const legendColor = isDark ? '#D1D5DB' : '#374151';

  // Garante que os nomes estão em português
  const nome1 = name1 || "Compras";
  const nome2 = name2 || "Consumo";
  
  // Converte meses para português se necessário
  const mesesPt = categories.map(mes => {
    const mesesMap = {
      "Jan": "Jan", "Feb": "Fev", "Mar": "Mar", "Apr": "Abr",
      "May": "Mai", "Jun": "Jun", "Jul": "Jul", "Aug": "Ago",
      "Sep": "Set", "Oct": "Out", "Nov": "Nov", "Dec": "Dez"
    };
    return mesesMap[mes] || mes;
  });

  // Tenta atualizar se já existe
  if (window.chartThreeInstance) {
    window.chartThreeInstance.updateSeries([
      { name: nome1, data: series1 },
      { name: nome2, data: series2 }
    ]);
    window.chartThreeInstance.updateOptions({ 
      xaxis: { 
        categories: mesesPt,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: textColor,
          },
        },
      },
      yaxis: {
        title: {
          style: {
            color: textColor,
          },
        },
        labels: {
          formatter: function (val) {
            return "R$ " + Math.floor(val).toLocaleString('pt-BR');
          },
          style: {
            colors: textColor,
          },
        },
      },
      grid: {
        borderColor: gridColor,
      },
      tooltip: {
        theme: tooltipTheme,
      },
      legend: {
        labels: {
          colors: legendColor,
        },
      },
    });
    return;
  }

  // Se não existe, aguarda um pouco e tenta novamente
  setTimeout(() => {
    if (window.chartThreeInstance) {
      window.chartThreeInstance.updateSeries([
        { name: nome1, data: series1 },
        { name: nome2, data: series2 }
      ]);
      window.chartThreeInstance.updateOptions({ 
        xaxis: { 
          categories: mesesPt,
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: 500,
              colors: textColor,
            },
          },
        },
        yaxis: {
          title: {
            style: {
              color: textColor,
            },
          },
          labels: {
            formatter: function (val) {
              return "R$ " + Math.floor(val).toLocaleString('pt-BR');
            },
            style: {
              colors: textColor,
            },
          },
        },
        grid: {
          borderColor: gridColor,
        },
        tooltip: {
          theme: tooltipTheme,
        },
        legend: {
          labels: {
            colors: legendColor,
          },
        },
      });
    }
  }, 500);
}

// Atualiza Chart 04 (Top Produtos Mais Consumidos)
function atualizarChart04(topProdutos) {
  const chartElement = document.querySelector("#chartFour");
  if (!chartElement) return;

  if (window.chartFourInstance && topProdutos && topProdutos.length > 0) {
    const categorias = topProdutos.map(p => p.codigo || p.nome);
    const dados = topProdutos.map(p => p.consumo || p.quantidade);
    window.chartFourInstance.updateSeries([{ name: "Consumo", data: dados }]);
    window.chartFourInstance.updateOptions({ xaxis: { categories: categorias } });
    return;
  }

  setTimeout(() => {
    if (window.chartFourInstance && topProdutos && topProdutos.length > 0) {
      const categorias = topProdutos.map(p => p.codigo || p.nome);
      const dados = topProdutos.map(p => p.consumo || p.quantidade);
      window.chartFourInstance.updateSeries([{ name: "Consumo", data: dados }]);
      window.chartFourInstance.updateOptions({ xaxis: { categories: categorias } });
    }
  }, 500);
}

function atualizarChart04Individual(produto) {
  const chartElement = document.querySelector("#chartFour");
  if (!chartElement) return;

  // No modo individual, mostra histórico de consumo do produto
  if (window.chartFourInstance && produto.historicoCompras) {
    const categorias = produto.historicoCompras.map(h => h.mes);
    const dados = produto.historicoCompras.map(h => h.quantidade);
    window.chartFourInstance.updateSeries([{ name: "Consumo", data: dados }]);
    window.chartFourInstance.updateOptions({ xaxis: { categories: categorias } });
  }
}

// Atualiza Chart 05 (Tendência de Estoque)
function atualizarChart05(tendenciaEstoque) {
  const chartElement = document.querySelector("#chartFive");
  if (!chartElement) return;

  if (window.chartFiveInstance && tendenciaEstoque) {
    window.chartFiveInstance.updateSeries([
      { name: "Estoque Total", data: tendenciaEstoque.total || [] },
      { name: "Estoque Disponível", data: tendenciaEstoque.disponivel || [] }
    ]);
    if (tendenciaEstoque.meses) {
      window.chartFiveInstance.updateOptions({ xaxis: { categories: tendenciaEstoque.meses } });
    }
    return;
  }

  setTimeout(() => {
    if (window.chartFiveInstance && tendenciaEstoque) {
      window.chartFiveInstance.updateSeries([
        { name: "Estoque Total", data: tendenciaEstoque.total || [] },
        { name: "Estoque Disponível", data: tendenciaEstoque.disponivel || [] }
      ]);
      if (tendenciaEstoque.meses) {
        window.chartFiveInstance.updateOptions({ xaxis: { categories: tendenciaEstoque.meses } });
      }
    }
  }, 500);
}

function atualizarChart05Individual(produto) {
  const chartElement = document.querySelector("#chartFive");
  if (!chartElement) return;

  // No modo individual, mostra tendência do estoque do produto
  if (window.chartFiveInstance && produto.historicoCompras) {
    const meses = produto.historicoCompras.map(h => h.mes);
    // Simula estoque ao longo do tempo baseado nas compras
    const estoqueTotal = produto.historicoCompras.map((h, idx) => {
      return produto.estoque + (idx * 100); // Aproximação
    });
    const estoqueDisponivel = estoqueTotal.map((total, idx) => {
      return total - produto.comprometido;
    });
    
    window.chartFiveInstance.updateSeries([
      { name: "Estoque Total", data: estoqueTotal },
      { name: "Estoque Disponível", data: estoqueDisponivel }
    ]);
    window.chartFiveInstance.updateOptions({ xaxis: { categories: meses } });
  }
}

// Atualiza as tabelas
export function atualizarTabelas(dados, modo) {
  if (modo === 'GLOBAL') {
    if (dados) atualizarTabelaGlobal(dados);
    // Atualiza tabela de pedidos e solicitações
    atualizarTabelaPedidosSolicitacoes(dados);
    // Limpa histórico de compras no modo global
    const tbodyHistorico = document.querySelector('[data-table="historico-compras"] tbody');
    if (tbodyHistorico) {
      tbodyHistorico.innerHTML = `
        <tr>
          <td colspan="5" class="py-8 text-center text-gray-500 dark:text-gray-400">
            Digite um código de produto para ver o histórico
          </td>
        </tr>
      `;
    }
  } else {
    // Modo INDIVIDUAL - SEMPRE mostra dados fictícios
    if (dados) atualizarTabelaIndividual(dados);
    // FORÇA atualização dos gráficos (mesmo sem produto)
    setTimeout(() => {
      atualizarGraficosIndividual(dados || {});
    }, 50);
  }
}

function atualizarTabelaGlobal(dados) {
  // Atualiza tabela com produtos principais ou fornecedores
  const tbody = document.querySelector('[data-table="produtos"] tbody');
  if (!tbody) return;

  // Por enquanto, mantém estrutura original
  // Pode ser expandido para mostrar produtos críticos
}


function atualizarTabelaIndividual(dados) {
  if (!dados.produto) return;

  const tbody = document.querySelector('[data-table="produtos"] tbody');
  if (!tbody) return;

  const produto = dados.produto;
  const statusClass = produto.disponivel < produto.pontoPedido ? 'error' : 'success';
  
  // Limpa tabela e adiciona informações do produto
  tbody.innerHTML = `
    <tr>
      <td class="py-3">
        <div class="flex items-center">
          <div>
            <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              ${produto.nome}
            </p>
            <span class="text-gray-500 text-theme-xs dark:text-gray-400">
              ${produto.codigo}
            </span>
          </div>
        </div>
      </td>
      <td class="py-3">
        <div class="flex items-center">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            ${produto.categoria}
          </p>
        </div>
      </td>
      <td class="py-3">
        <div class="flex items-center">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            R$ ${produto.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </td>
      <td class="py-3">
        <div class="flex items-center">
          <p class="rounded-full bg-${statusClass}-50 px-2 py-0.5 text-theme-xs font-medium text-${statusClass}-600 dark:bg-${statusClass}-500/15 dark:text-${statusClass}-500">
            ${produto.disponivel < produto.pontoPedido ? 'Atenção' : 'Normal'}
          </p>
        </div>
      </td>
    </tr>
  `;
}

// Atualiza informações do produto (componente lateral)
function atualizarProductInfoGlobal() {
  const globalDiv = document.getElementById('product-info-global');
  const individualDiv = document.getElementById('product-info-individual');
  
  if (globalDiv) globalDiv.classList.remove('hidden');
  if (individualDiv) individualDiv.classList.add('hidden');
}

function atualizarProductInfoIndividual(dados) {
  if (!dados.produto) return;

  const globalDiv = document.getElementById('product-info-global');
  const individualDiv = document.getElementById('product-info-individual');
  
  if (globalDiv) globalDiv.classList.add('hidden');
  if (individualDiv) individualDiv.classList.remove('hidden');

  const produto = dados.produto;
  const fornecedor = dados.fornecedor;

  // Atualiza informações básicas
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('prod-codigo', produto.codigo);
  setText('prod-categoria', produto.categoria);
  setText('prod-estoque', produto.estoque.toLocaleString('pt-BR'));
  setText('prod-comprometido', produto.comprometido.toLocaleString('pt-BR'));
  setText('prod-disponivel', produto.disponivel.toLocaleString('pt-BR'));
  setText('prod-ponto-pedido', produto.pontoPedido.toLocaleString('pt-BR'));
  setText('prod-valor', `R$ ${produto.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  setText('prod-duracao', `${dados.tempoDuracaoEstimado || 0} dias`);

  // Atualiza informações do fornecedor
  if (fornecedor) {
    setText('prod-fornecedor-nome', fornecedor.nome);
    setText('prod-fornecedor-pontualidade', `${fornecedor.taxaPontualidade.toFixed(1)}%`);
    setText('prod-fornecedor-tempo', `${fornecedor.tempoMedioEntrega} dias`);
  } else {
    setText('prod-fornecedor-nome', 'Não informado');
    setText('prod-fornecedor-pontualidade', '-');
    setText('prod-fornecedor-tempo', '-');
  }

  // Atualiza status
  const statusSolicitacao = document.getElementById('prod-status-solicitacao');
  const statusPedido = document.getElementById('prod-status-pedido');

  if (statusSolicitacao) {
    if (produto.solicitacaoCompra) {
      statusSolicitacao.textContent = 'Solicitação Aberta';
      statusSolicitacao.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500';
    } else {
      statusSolicitacao.textContent = 'Sem Solicitação';
      statusSolicitacao.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  }

  if (statusPedido) {
    if (produto.pedidoCompra) {
      statusPedido.textContent = 'Pedido de Compra';
      statusPedido.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500';
    } else {
      statusPedido.textContent = 'Sem Pedido';
      statusPedido.className = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  }
}

// Atualiza Chart 06 (Lead Time)
function atualizarChart06(data) {
  const chartElement = document.querySelector("#chartSix");
  if (!chartElement) return;

  const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (window.chartSixInstance) {
    window.chartSixInstance.updateSeries([{ name: "Lead Time", data: Array.isArray(data) ? data : meses.map(() => data) }]);
    window.chartSixInstance.updateOptions({ xaxis: { categories: meses } });
    return;
  }

  setTimeout(() => {
    if (window.chartSixInstance) {
      window.chartSixInstance.updateSeries([{ name: "Lead Time", data: Array.isArray(data) ? data : meses.map(() => data) }]);
      window.chartSixInstance.updateOptions({ xaxis: { categories: meses } });
    }
  }, 500);
}

// Atualiza Chart 07 (Atrasos por Fornecedor)
function atualizarChart07(fornecedores) {
  const chartElement = document.querySelector("#chartSeven");
  if (!chartElement) return;

  if (window.chartSevenInstance) {
    const categorias = fornecedores.map(f => f.nome);
    const dados = fornecedores.map(f => f.atrasos);
    window.chartSevenInstance.updateSeries([{ name: "Atrasos", data: dados }]);
    window.chartSevenInstance.updateOptions({ xaxis: { categories: categorias } });
    return;
  }

  setTimeout(() => {
    if (window.chartSevenInstance) {
      const categorias = fornecedores.map(f => f.nome);
      const dados = fornecedores.map(f => f.atrasos);
      window.chartSevenInstance.updateSeries([{ name: "Atrasos", data: dados }]);
      window.chartSevenInstance.updateOptions({ xaxis: { categories: categorias } });
    }
  }, 500);
}

function atualizarChart07Individual(fornecedor) {
  const chartElement = document.querySelector("#chartSeven");
  if (!chartElement) return;

  if (window.chartSevenInstance) {
    window.chartSevenInstance.updateSeries([{ name: "Atrasos", data: [fornecedor.pedidosAtrasados] }]);
    window.chartSevenInstance.updateOptions({ 
      yaxis: { categories: [fornecedor.nome] },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      }
    });
  }
}

// Atualiza Chart 08 (Distribuição por Categoria)
function atualizarChart08(distribuicao) {
  const chartElement = document.querySelector("#chartEight");
  if (!chartElement) return;

  const theme = getThemeColors();

  if (window.chartEightInstance) {
    const series = distribuicao.map(d => d.percentual);
    const labels = distribuicao.map(d => d.categoria);
    window.chartEightInstance.updateSeries(series);
    window.chartEightInstance.updateOptions({ 
      labels: labels,
      legend: {
        labels: {
          colors: theme.legendColor,
        },
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartEightInstance) {
      const series = distribuicao.map(d => d.percentual);
      const labels = distribuicao.map(d => d.categoria);
      window.chartEightInstance.updateSeries(series);
      window.chartEightInstance.updateOptions({ 
        labels: labels,
        legend: {
          labels: {
            colors: theme.legendColor,
          },
        },
        tooltip: {
          theme: theme.tooltipTheme,
        },
      });
    }
  }, 500);
}

function atualizarChart08Individual(produto) {
  const chartElement = document.querySelector("#chartEight");
  if (!chartElement) return;

  if (window.chartEightInstance) {
    window.chartEightInstance.updateSeries([100]);
    window.chartEightInstance.updateOptions({ labels: [produto.categoria] });
  }
}

// Atualiza Chart 09 (Itens Próximos do Ponto)
function atualizarChart09(itens) {
  const chartElement = document.querySelector("#chartNine");
  if (!chartElement) return;

  if (window.chartNineInstance) {
    const categorias = itens.map(i => i.codigo);
    const disponivel = itens.map(i => i.disponivel);
    const pontoPedido = itens.map(i => i.pontoPedido);
    window.chartNineInstance.updateSeries([
      { name: "Disponível", data: disponivel },
      { name: "Ponto de Pedido", data: pontoPedido }
    ]);
    window.chartNineInstance.updateOptions({ xaxis: { categories: categorias } });
    return;
  }

  setTimeout(() => {
    if (window.chartNineInstance) {
      const categorias = itens.map(i => i.codigo);
      const disponivel = itens.map(i => i.disponivel);
      const pontoPedido = itens.map(i => i.pontoPedido);
      window.chartNineInstance.updateSeries([
        { name: "Disponível", data: disponivel },
        { name: "Ponto de Pedido", data: pontoPedido }
      ]);
      window.chartNineInstance.updateOptions({ xaxis: { categories: categorias } });
    }
  }, 500);
}

function atualizarChart09Individual(produto) {
  const chartElement = document.querySelector("#chartNine");
  if (!chartElement) return;

  if (window.chartNineInstance) {
    window.chartNineInstance.updateSeries([
      { name: "Disponível", data: [produto.disponivel] },
      { name: "Ponto de Pedido", data: [produto.pontoPedido] }
    ]);
    window.chartNineInstance.updateOptions({ xaxis: { categories: [produto.codigo] } });
  }
}

// Atualiza Chart 10 (KPI Gauge - Duração)
function atualizarChart10(dias) {
  const chartElement = document.querySelector("#chartTen");
  if (!chartElement) return;

  const percentual = Math.min(100, Math.max(0, (dias / 90) * 100)); // Normaliza para 90 dias = 100%

  if (window.chartTenInstance) {
    window.chartTenInstance.updateSeries([percentual]);
    window.chartTenInstance.updateOptions({
      plotOptions: {
        radialBar: {
          dataLabels: {
            value: {
              formatter: function() {
                return dias + " dias";
              }
            }
          }
        }
      }
    });
    return;
  }

  setTimeout(() => {
    if (window.chartTenInstance) {
      window.chartTenInstance.updateSeries([percentual]);
      window.chartTenInstance.updateOptions({
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                formatter: function() {
                  return dias + " dias";
                }
              }
            }
          }
        }
      });
    }
  }, 500);
}

// Atualiza Chart 11 (Curva de Consumo 12 meses) - Global
function atualizarChart11(data, categories) {
  const chartElement = document.querySelector("#chartEleven");
  if (!chartElement) return;

  const theme = getThemeColors();

  if (window.chartElevenInstance) {
    window.chartElevenInstance.updateSeries([{ name: "Consumo", data: data }]);
    window.chartElevenInstance.updateOptions({ 
      xaxis: { 
        categories: categories,
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      yaxis: {
        title: {
          style: {
            color: theme.textColor,
          },
        },
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      grid: {
        borderColor: theme.gridColor,
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartElevenInstance) {
      window.chartElevenInstance.updateSeries([{ name: "Consumo", data: data }]);
      window.chartElevenInstance.updateOptions({ 
        xaxis: { 
          categories: categories,
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        yaxis: {
          title: {
            style: {
              color: theme.textColor,
            },
          },
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        grid: {
          borderColor: theme.gridColor,
        },
        tooltip: {
          theme: theme.tooltipTheme,
        },
      });
    }
  }, 500);
}

// Atualiza Chart 11 Individual (com tendência e média móvel)
function atualizarChart11Individual(data, categories, produto) {
  const chartElement = document.querySelector("#chartEleven");
  if (!chartElement) return;

  // Calcula média móvel de 3 meses
  const mediaMovel = [];
  for (let i = 0; i < data.length; i++) {
    if (i < 2) {
      mediaMovel.push(0);
    } else {
      const media = (data[i-2] + data[i-1] + data[i]) / 3;
      mediaMovel.push(Math.round(media));
    }
  }

  // Calcula linha de tendência (regressão linear simples)
  const tendencia = [];
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += data[i];
    sumXY += i * data[i];
    sumX2 += i * i;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  for (let i = 0; i < n; i++) {
    tendencia.push(Math.round(intercept + slope * i));
  }

  // Encontra menor e maior consumo
  const minConsumo = Math.min(...data);
  const maxConsumo = Math.max(...data);
  const minIndex = data.indexOf(minConsumo);
  const maxIndex = data.indexOf(maxConsumo);

  if (window.chartElevenInstance) {
    window.chartElevenInstance.updateSeries([
      { name: "Consumo", data: data },
      { name: "Média Móvel (3 meses)", data: mediaMovel, type: "line" },
      { name: "Tendência", data: tendencia, type: "line" }
    ]);
    window.chartElevenInstance.updateOptions({ 
      xaxis: { categories: categories },
      annotations: {
        points: [
          {
            x: categories[minIndex],
            y: minConsumo,
            marker: {
              size: 6,
              fillColor: "#EF4444",
              strokeColor: "#fff",
              strokeWidth: 2,
            },
            label: {
              text: "Menor",
              style: {
                color: "#EF4444",
                fontSize: "12px",
              },
            },
          },
          {
            x: categories[maxIndex],
            y: maxConsumo,
            marker: {
              size: 6,
              fillColor: "#10B981",
              strokeColor: "#fff",
              strokeWidth: 2,
            },
            label: {
              text: "Maior",
              style: {
                color: "#10B981",
                fontSize: "12px",
              },
            },
          },
        ],
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartElevenInstance) {
      window.chartElevenInstance.updateSeries([
        { name: "Consumo", data: data },
        { name: "Média Móvel (3 meses)", data: mediaMovel, type: "line" },
        { name: "Tendência", data: tendencia, type: "line" }
      ]);
      window.chartElevenInstance.updateOptions({ 
        xaxis: { categories: categories },
        annotations: {
          points: [
            {
              x: categories[minIndex],
              y: minConsumo,
              marker: {
                size: 6,
                fillColor: "#EF4444",
                strokeColor: "#fff",
                strokeWidth: 2,
              },
              label: {
                text: "Menor",
                style: {
                  color: "#EF4444",
                  fontSize: "12px",
                },
              },
            },
            {
              x: categories[maxIndex],
              y: maxConsumo,
              marker: {
                size: 6,
                fillColor: "#10B981",
                strokeColor: "#fff",
                strokeWidth: 2,
              },
              label: {
                text: "Maior",
                style: {
                  color: "#10B981",
                  fontSize: "12px",
                },
              },
            },
          ],
        },
      });
    }
  }, 500);
}

// Atualiza Chart 12 (Movimentação do Estoque) - Global
function atualizarChart12(movimentacao) {
  const chartElement = document.querySelector("#chartTwelve");
  if (!chartElement) return;

  const theme = getThemeColors();

  if (window.chartTwelveInstance) {
    window.chartTwelveInstance.updateSeries([
      { name: "Entradas", data: movimentacao.entradas || movimentacao.meses.map(() => 0) },
      { name: "Saídas", data: movimentacao.saidas || movimentacao.meses.map(() => 0) }
    ]);
    window.chartTwelveInstance.updateOptions({ 
      xaxis: { 
        categories: movimentacao.meses,
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      yaxis: {
        title: {
          style: {
            color: theme.textColor,
          },
        },
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      grid: {
        borderColor: theme.gridColor,
      },
      legend: {
        labels: {
          colors: theme.legendColor,
        },
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartTwelveInstance) {
      window.chartTwelveInstance.updateSeries([
        { name: "Entradas", data: movimentacao.entradas || movimentacao.meses.map(() => 0) },
        { name: "Saídas", data: movimentacao.saidas || movimentacao.meses.map(() => 0) }
      ]);
      window.chartTwelveInstance.updateOptions({ 
        xaxis: { 
          categories: movimentacao.meses,
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        yaxis: {
          title: {
            style: {
              color: theme.textColor,
            },
          },
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        grid: {
          borderColor: theme.gridColor,
        },
        legend: {
          labels: {
            colors: theme.legendColor,
          },
        },
        tooltip: {
          theme: theme.tooltipTheme,
        },
      });
    }
  }, 500);
}

// Atualiza Chart 12 Individual (com ponto de pedido e média de consumo)
function atualizarChart12Individual(movimentacao, produto) {
  const chartElement = document.querySelector("#chartTwelve");
  if (!chartElement) return;

  const pontoPedido = produto.pontoPedido || 0;
  const consumoMedio = produto.consumoMedio * 30 || 0; // consumo mensal
  const meses = movimentacao.meses || [];
  const pontoPedidoArray = meses.map(() => pontoPedido);
  const consumoMedioArray = meses.map(() => consumoMedio);

  if (window.chartTwelveInstance) {
    window.chartTwelveInstance.updateSeries([
      { name: "Entradas", data: movimentacao.entradas || meses.map(() => 0) },
      { name: "Saídas", data: movimentacao.saidas || meses.map(() => 0) },
      { name: "Ponto de Pedido", data: pontoPedidoArray, type: "line" },
      { name: "Média de Consumo", data: consumoMedioArray, type: "line" }
    ]);
    window.chartTwelveInstance.updateOptions({ 
      xaxis: { categories: meses },
      chart: {
        type: "line",
      },
      stroke: {
        curve: ["smooth", "smooth", "straight", "straight"],
        width: [2, 2, 2, 2],
        dashArray: [0, 0, 5, 3],
      },
      fill: {
        type: ["gradient", "gradient", "solid", "solid"],
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartTwelveInstance) {
      window.chartTwelveInstance.updateSeries([
        { name: "Entradas", data: movimentacao.entradas || meses.map(() => 0) },
        { name: "Saídas", data: movimentacao.saidas || meses.map(() => 0) },
        { name: "Ponto de Pedido", data: pontoPedidoArray, type: "line" },
        { name: "Média de Consumo", data: consumoMedioArray, type: "line" }
      ]);
      window.chartTwelveInstance.updateOptions({ 
        xaxis: { categories: meses },
        chart: {
          type: "line",
        },
        stroke: {
          curve: ["smooth", "smooth", "straight", "straight"],
          width: [2, 2, 2, 2],
          dashArray: [0, 0, 5, 3],
        },
        fill: {
          type: ["gradient", "gradient", "solid", "solid"],
        },
      });
    }
  }, 500);
}

// Atualiza Chart 13 (Ranking de Fornecedores) - Horizontal Bar
function atualizarChart13(fornecedores) {
  const chartElement = document.querySelector("#chartThirteen");
  if (!chartElement) return;

  const theme = getThemeColors();

  // Ordena por performance (taxa de pontualidade) - maior para menor
  const sorted = [...fornecedores].sort((a, b) => b.taxa - a.taxa);

  if (window.chartThirteenInstance) {
    const categorias = sorted.map(f => f.nome);
    const dados = sorted.map(f => f.taxa);
    window.chartThirteenInstance.updateSeries([{ 
      name: "Taxa de Pontualidade", 
      data: dados 
    }]);
    window.chartThirteenInstance.updateOptions({ 
      xaxis: {
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      yaxis: { 
        title: {
          style: {
            color: theme.textColor,
          },
        },
        labels: {
          formatter: function (val) {
            return val + "%";
          },
          style: {
            fontSize: "12px",
            fontWeight: 600,
            colors: theme.textColor,
          },
        },
      },
      grid: {
        borderColor: theme.gridColor,
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
    return;
  }

  setTimeout(() => {
    if (window.chartThirteenInstance) {
      const categorias = sorted.map(f => f.nome);
      const dados = sorted.map(f => f.taxa);
      window.chartThirteenInstance.updateSeries([{ 
        name: "Taxa de Pontualidade", 
        data: dados 
      }]);
      window.chartThirteenInstance.updateOptions({ 
        xaxis: {
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        yaxis: { 
          title: {
            style: {
              color: theme.textColor,
            },
          },
          labels: {
            formatter: function (val) {
              return val + "%";
            },
            style: {
              fontSize: "12px",
              fontWeight: 600,
              colors: theme.textColor,
            },
          },
        },
        grid: {
          borderColor: theme.gridColor,
        },
        tooltip: {
          theme: theme.tooltipTheme,
        },
      });
    }
  }, 500);
}

function atualizarChart13Individual(fornecedor) {
  const chartElement = document.querySelector("#chartThirteen");
  if (!chartElement) return;

  if (window.chartThirteenInstance) {
    window.chartThirteenInstance.updateSeries([{ name: "Performance", data: [fornecedor.taxaPontualidade] }]);
    window.chartThirteenInstance.updateOptions({ xaxis: { categories: [fornecedor.nome] } });
  }
}

// Atualiza Chart 15 (Bar Chart - Consumo Mensal do Produto)
function atualizarChart15(produto) {
  const chartElement = document.querySelector("#chartFifteen");
  if (!chartElement) return;

  const theme = getThemeColors();
  
  // Dados de consumo mensal dos últimos 12 meses
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const consumoMedio = produto?.consumoMedio || 200;
  
  // Gera dados variados baseados no consumo médio
  const consumoData = meses.map(() => {
    const variacao = (Math.random() * 0.4 - 0.2); // Variação de -20% a +20%
    return Math.round(consumoMedio * (1 + variacao));
  });

  if (window.chartFifteenInstance) {
    window.chartFifteenInstance.updateSeries([
      { name: "Consumo", data: consumoData }
    ]);
    window.chartFifteenInstance.updateOptions({
      xaxis: {
        categories: meses,
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.textColor,
          },
        },
      },
      grid: {
        borderColor: theme.gridColor,
      },
      tooltip: {
        theme: theme.tooltipTheme,
      },
    });
  }
}

// Atualiza Chart Individual 01 (Taxa de Utilização)
function atualizarChartIndividual01(produto) {
  const chartElement = document.querySelector("#chartIndividual01");
  if (!chartElement) return;

  const theme = getThemeColors();
  const estoqueAtual = produto?.estoqueAtual || 1250;
  const estoqueMinimo = produto?.estoqueMinimo || 500;
  const utilizacao = ((estoqueAtual - estoqueMinimo) / estoqueAtual) * 100;
  
  // Atualiza valor e mudança
  const valueEl = document.getElementById('chart-individual-01-value');
  const changeEl = document.getElementById('chart-individual-01-change');
  const statusEl = document.getElementById('chart-individual-01-status');
  const trendEl = document.getElementById('chart-individual-01-trend');
  
  if (valueEl) valueEl.textContent = utilizacao.toFixed(2) + "%";
  if (changeEl) {
    const mudanca = (Math.random() * 0.5 - 0.25).toFixed(2);
    changeEl.textContent = `${mudanca > 0 ? '+' : ''}${mudanca}% que na semana passada`;
    changeEl.className = `text-xs leading-tight ${mudanca > 0 ? 'text-error-600 dark:text-error-400' : 'text-success-600 dark:text-success-400'}`;
  }
  
  // Atualiza card informativo
  if (statusEl) {
    if (utilizacao > 80) {
      statusEl.textContent = "Alto";
      if (trendEl) trendEl.textContent = "↑ Atenção";
    } else if (utilizacao > 50) {
      statusEl.textContent = "Moderado";
      if (trendEl) trendEl.textContent = "↑ Monitorar";
    } else {
      statusEl.textContent = "Normal";
      if (trendEl) trendEl.textContent = "↑ Estável";
    }
  }

  if (window.chartIndividual01Instance) {
    const data = Array.from({ length: 7 }, () => utilizacao + (Math.random() * 0.5 - 0.25));
    window.chartIndividual01Instance.updateSeries([{ data }]);
  }
}

// Atualiza Chart Individual 02 (Crescimento de Consumo)
function atualizarChartIndividual02(produto) {
  const chartElement = document.querySelector("#chartIndividual02");
  if (!chartElement) return;

  const consumoMedio = produto?.consumoMedio || 200;
  const crescimento = consumoMedio * 12;
  
  // Atualiza valor e mudança
  const valueEl = document.getElementById('chart-individual-02-value');
  const changeEl = document.getElementById('chart-individual-02-change');
  const statusEl = document.getElementById('chart-individual-02-status');
  const trendEl = document.getElementById('chart-individual-02-trend');
  
  if (valueEl) valueEl.textContent = crescimento.toLocaleString('pt-BR');
  if (changeEl) {
    const mudanca = (Math.random() * 5 + 2).toFixed(2);
    changeEl.textContent = `+${mudanca}% que na semana passada`;
    changeEl.className = "text-xs text-success-600 dark:text-success-400 leading-tight";
  }
  
  // Atualiza card informativo
  if (statusEl) {
    if (crescimento > 5000) {
      statusEl.textContent = "Alto Crescimento";
      if (trendEl) trendEl.textContent = "↑ Excelente";
    } else if (crescimento > 3000) {
      statusEl.textContent = "Crescendo";
      if (trendEl) trendEl.textContent = "↑ Positivo";
    } else {
      statusEl.textContent = "Estável";
      if (trendEl) trendEl.textContent = "↑ Normal";
    }
  }

  if (window.chartIndividual02Instance) {
    const data = Array.from({ length: 5 }, (_, i) => crescimento * (0.9 + i * 0.025));
    window.chartIndividual02Instance.updateSeries([{ data }]);
  }
}

// Atualiza Chart Individual 03 (Performance do Produto)
function atualizarChartIndividual03(produto) {
  const chartElement = document.querySelector("#chartIndividual03");
  if (!chartElement) return;

  const consumoMedio = produto?.consumoMedio || 200;
  const consumoReal = consumoMedio * 0.95;
  const consumoProjetado = consumoMedio * 1.05;
  
  // Atualiza valores
  const realEl = document.getElementById('chart-individual-03-real');
  const projetadoEl = document.getElementById('chart-individual-03-projetado');
  const mediaEl = document.getElementById('chart-individual-03-media');
  const changeEl = document.getElementById('chart-individual-03-change');
  
  if (realEl) realEl.textContent = Math.round(consumoReal).toLocaleString('pt-BR');
  if (projetadoEl) projetadoEl.textContent = Math.round(consumoProjetado).toLocaleString('pt-BR');
  if (mediaEl) mediaEl.textContent = `$${consumoMedio.toLocaleString('pt-BR')}`;
  if (changeEl) {
    const mudanca = (Math.random() * 0.5 - 0.25).toFixed(2);
    changeEl.textContent = `${mudanca > 0 ? '+' : ''}${mudanca}%`;
    changeEl.className = `text-xs ${mudanca > 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`;
  }

  if (window.chartIndividual03Instance) {
    const data = Array.from({ length: 7 }, () => consumoMedio + (Math.random() * 40 - 20));
    window.chartIndividual03Instance.updateSeries([{ data }]);
  }
}

// Atualiza Chart Individual 04 (Funil de Movimentação)
function atualizarChartIndividual04(produto) {
  const chartElement = document.querySelector("#chartIndividual04");
  if (!chartElement) return;

  if (window.chartIndividual04Instance) {
    // Dados fictícios baseados no produto
    const base = produto?.consumoMedio || 200;
    const entrada = Array.from({ length: 5 }, () => base * 0.6 + Math.random() * 20);
    const processamento = Array.from({ length: 5 }, () => base * 0.4 + Math.random() * 15);
    const uso = Array.from({ length: 5 }, () => base * 0.3 + Math.random() * 10);
    const saida = Array.from({ length: 5 }, () => base * 0.2 + Math.random() * 8);
    
    window.chartIndividual04Instance.updateSeries([
      { name: "Entrada no Estoque", data: entrada },
      { name: "Em Processamento", data: processamento },
      { name: "Em Uso", data: uso },
      { name: "Saída do Estoque", data: saida }
    ]);
  }
}

// Atualiza Chart Individual 05 (Consumo Mensal)
function atualizarChartIndividual05(produto) {
  const chartElement = document.querySelector("#chartIndividual05");
  if (!chartElement) return;

  const consumoMedio = produto?.consumoMedio || 200;
  
  if (window.chartIndividual05Instance) {
    const data = Array.from({ length: 12 }, () => consumoMedio + (Math.random() * 60 - 30));
    window.chartIndividual05Instance.updateSeries([{ data }]);
  }
}

// Atualiza tabela de histórico de compras individual
function atualizarTabelaHistoricoComprasIndividual(produto) {
  const tbody = document.querySelector('[data-table="historico-compras-individual"]');
  if (!tbody) return;

  const historico = produto?.historicoCompras || [
    { numero: "#DF429", data: "28 de abr, 2024", quantidade: 800, valor: 680.00, status: "Complete" },
    { numero: "#HTY274", data: "30 de out, 2024", quantidade: 600, valor: 510.00, status: "Complete" },
    { numero: "#LKE600", data: "29 de mai, 2024", quantidade: 900, valor: 765.00, status: "Pending" },
    { numero: "#HRP447", data: "20 de mai, 2024", quantidade: 750, valor: 637.50, status: "Cancelled" },
    { numero: "#WRH647", data: "13 de mar, 2024", quantidade: 850, valor: 722.50, status: "Complete" },
  ];

  tbody.innerHTML = historico.map(item => {
    const statusColor = item.status === "Complete" ? "text-success-600 dark:text-success-400" :
                       item.status === "Pending" ? "text-warning-600 dark:text-warning-400" :
                       "text-error-600 dark:text-error-400";
    
    return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-3 px-4">
          <span class="text-sm font-medium text-gray-800 dark:text-white/90">${item.numero}</span>
        </td>
        <td class="py-3 px-4">
          <span class="text-sm text-gray-600 dark:text-gray-400">${item.data}</span>
        </td>
        <td class="py-3 px-4">
          <span class="text-sm text-gray-800 dark:text-white/90">${item.quantidade.toLocaleString('pt-BR')}</span>
        </td>
        <td class="py-3 px-4">
          <span class="text-sm font-semibold text-gray-800 dark:text-white/90">R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </td>
        <td class="py-3 px-4">
          <span class="text-sm font-medium ${statusColor}">${item.status}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// Atualiza atividades individuais
function atualizarAtividadesIndividual(produto) {
  const container = document.querySelector('[data-activities="individual"]');
  if (!container) return;

  const atividades = produto?.atividades || [
    { nome: "Francisco Grbbs", acao: "Nova compra", referencia: "PQ-4491C", tempo: "Agora" },
    { nome: "Courtney Henry", acao: "Compra criada", referencia: "HK-234G", tempo: "15 minutos atrás" },
    { nome: "Bessie Cooper", acao: "Compra criada", referencia: "LH-2891C", tempo: "5 meses atrás" },
    { nome: "Theresa Web", acao: "Compra criada", referencia: "CK-125NH", tempo: "2 semanas atrás" },
  ];

  container.innerHTML = atividades.map(item => `
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
        <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
          ${item.nome.charAt(0)}
        </span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-semibold text-gray-800 dark:text-white/90">${item.nome}</p>
        <p class="text-xs text-gray-600 dark:text-gray-400">
          ${item.acao} <span class="font-medium">${item.referencia}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${item.tempo}</p>
      </div>
    </div>
  `).join('');
}

// Atualiza card informativo individual
function atualizarCardInformativoIndividual(produto) {
  const produtoEl = document.getElementById('info-card-produto');
  const fornecedorEl = document.getElementById('info-card-fornecedor');
  const atualizacaoEl = document.getElementById('info-card-atualizacao');
  
  if (produtoEl) {
    const nomeProduto = produto?.nome || produto?.codigo || "Nenhum produto";
    produtoEl.textContent = nomeProduto.length > 20 ? nomeProduto.substring(0, 20) + "..." : nomeProduto;
  }
  
  if (fornecedorEl) {
    const fornecedor = produto?.fornecedor || produto?.fornecedorAtual?.nome || "Não informado";
    fornecedorEl.textContent = fornecedor.length > 15 ? fornecedor.substring(0, 15) + "..." : fornecedor;
  }
  
  if (atualizacaoEl) {
    const agora = new Date();
    atualizacaoEl.textContent = agora.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}

// Atualiza Chart 16 (Gauge - Duração Estimada do Estoque)
function atualizarChart16(produto) {
  const chartElement = document.querySelector("#chartSixteen");
  if (!chartElement) return;

  const theme = getThemeColors();
  
  // Dados baseados no produto ou fictícios
  const estoqueAtual = produto?.estoqueAtual || 1250;
  const estoqueMinimo = produto?.estoqueMinimo || 500;
  const consumoMedio = produto?.consumoMedio || 50;
  const duracaoEstimada = produto?.tempoDuracaoEstimado || 37;
  
  // Calcula porcentagem baseada na duração estimada (considerando 60 dias como 100%)
  const duracaoMaxima = 60; // 60 dias como referência máxima
  const porcentagem = Math.min(100, Math.max(0, (duracaoEstimada / duracaoMaxima) * 100));
  
  // Atualiza mensagem
  const messageEl = document.getElementById('chartSixteen-message');
  if (messageEl) {
    if (porcentagem > 50) {
      messageEl.textContent = `Estoque suficiente para os próximos ${duracaoEstimada} dias. Mantenha o bom trabalho!`;
    } else if (porcentagem > 25) {
      messageEl.textContent = `Estoque em nível moderado. Considere fazer um pedido em breve.`;
    } else {
      messageEl.textContent = `Estoque próximo do mínimo. Faça um pedido urgentemente!`;
    }
  }
  
  // Atualiza métricas no rodapé
  const minEl = document.getElementById('chartSixteen-min');
  const currentEl = document.getElementById('chartSixteen-current');
  const durationEl = document.getElementById('chartSixteen-duration');
  
  if (minEl) minEl.textContent = estoqueMinimo.toLocaleString('pt-BR');
  if (currentEl) currentEl.textContent = estoqueAtual.toLocaleString('pt-BR');
  if (durationEl) durationEl.textContent = `${duracaoEstimada} dias`;

  if (window.chartSixteenInstance) {
    window.chartSixteenInstance.updateSeries([porcentagem]);
    window.chartSixteenInstance.updateOptions({
      plotOptions: {
        radialBar: {
          track: {
            background: theme.isDark ? "#374151" : "#E5E7EB",
          },
          dataLabels: {
            value: {
              color: theme.textColor,
            },
          },
        },
      },
      fill: {
        gradient: {
          stops: [0, 50, 53, 91],
        },
      },
    });
  }
}

// Atualiza tabela de histórico de compras
export function atualizarTabelaHistoricoCompras(dados) {
  // Tenta encontrar a tabela - pode estar na seção individual que está escondida
  let tbody = document.querySelector('[data-table="historico-compras"] tbody');
  
  // Se não encontrou, tenta encontrar na seção individual mesmo que esteja escondida
  if (!tbody) {
    const secaoIndividual = document.getElementById('secao-individual');
    if (secaoIndividual) {
      tbody = secaoIndividual.querySelector('[data-table="historico-compras"] tbody');
    }
  }
  
  if (!tbody) {
    // Tenta novamente após um delay se não encontrou
    setTimeout(() => atualizarTabelaHistoricoCompras(dados), 200);
    return;
  }

  // Dados fictícios padrão para demonstração - SEMPRE DISPONÍVEIS
  const dadosFicticios = [
    { mes: "Jan", quantidade: 800, valor: 680.00, dataEntrega: "2024-01-15", atraso: 0 },
    { mes: "Fev", quantidade: 600, valor: 510.00, dataEntrega: "2024-02-20", atraso: 5 },
    { mes: "Mar", quantidade: 900, valor: 765.00, dataEntrega: "2024-03-10", atraso: 0 },
    { mes: "Abr", quantidade: 750, valor: 637.50, dataEntrega: "2024-04-18", atraso: 3 },
    { mes: "Mai", quantidade: 850, valor: 722.50, dataEntrega: "2024-05-12", atraso: 0 },
    { mes: "Jun", quantidade: 700, valor: 595.00, dataEntrega: "2024-06-25", atraso: 8 },
  ];

  // SEMPRE começa com dados fictícios
  let historico = [...dadosFicticios];
  
  // SÓ substitui se houver produto REAL com histórico válido
  const temProdutoReal = dados && dados.produto && dados.produto.historicoCompras && 
                         Array.isArray(dados.produto.historicoCompras) && 
                         dados.produto.historicoCompras.length > 0;
  
  if (temProdutoReal) {
    historico = dados.produto.historicoCompras;
  }
  
  // Garantia absoluta: se histórico estiver vazio, usa fictícios
  if (!historico || historico.length === 0) {
    historico = [...dadosFicticios];
  }

  // Ordena por data (mais recente primeiro)
  const historicoOrdenado = [...historico].sort((a, b) => {
    const dataA = a.dataEntrega ? new Date(a.dataEntrega) : new Date(0);
    const dataB = b.dataEntrega ? new Date(b.dataEntrega) : new Date(0);
    return dataB - dataA;
  });

  tbody.innerHTML = historicoOrdenado.map((h, index) => {
    const dataFormatada = h.dataEntrega ? new Date(h.dataEntrega).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }) : h.mes;
    const atrasoTexto = h.atraso > 0 ? `${h.atraso} ${h.atraso === 1 ? 'dia' : 'dias'}` : 'No prazo';
    const isAtrasado = h.atraso > 0;
    
    return `
    <tr class="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-800/30 transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
      <td class="py-5 px-4">
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0 w-10 h-10 rounded-lg ${isAtrasado ? 'bg-error-100 dark:bg-error-500/20' : 'bg-success-100 dark:bg-success-500/20'} flex items-center justify-center">
            ${isAtrasado 
              ? '<svg class="h-5 w-5 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
              : '<svg class="h-5 w-5 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
            }
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900 dark:text-white">${dataFormatada}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Compra #${String(index + 1).padStart(3, '0')}</p>
          </div>
        </div>
      </td>
      <td class="py-5 px-4 text-right">
        <p class="text-base font-bold text-gray-900 dark:text-white">${h.quantidade.toLocaleString('pt-BR')}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">unidades</p>
      </td>
      <td class="py-5 px-4 text-right">
        <p class="text-base font-bold text-gray-900 dark:text-white">R$ ${h.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </td>
      <td class="py-5 px-4 text-center">
        <div class="inline-flex items-center gap-1.5">
          ${isAtrasado 
            ? '<svg class="h-4 w-4 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            : '<svg class="h-4 w-4 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
          }
          <p class="text-sm font-bold ${isAtrasado ? 'text-error-600 dark:text-error-400' : 'text-success-600 dark:text-success-400'}">
            ${atrasoTexto}
          </p>
        </div>
      </td>
      <td class="py-5 px-4 text-center">
        ${isAtrasado 
          ? '<span class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-error-500 to-error-600 px-4 py-1.5 text-xs font-bold text-white shadow-md"><svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>Atrasado</span>'
          : '<span class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-success-500 to-success-600 px-4 py-1.5 text-xs font-bold text-white shadow-md"><svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>No Prazo</span>'
        }
      </td>
    </tr>
  `;
  }).join('');
}

// Atualiza Chart 14 (Atrasos do Fornecedor por Mês)
export function atualizarChart14(historicoEntregas) {
  const chartElement = document.querySelector("#chartFourteen");
  if (!chartElement) return;

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
  // Dados fictícios padrão para demonstração
  const dadosFicticios = [0, 5, 3, 0, 2, 0, 1, 0, 0, 0, 0, 0];
  
  let atrasosPorMes = dadosFicticios; // Sempre usa dados fictícios por padrão
  
  // Se houver histórico real, calcula os atrasos
  if (historicoEntregas && historicoEntregas.length > 0) {
    atrasosPorMes = meses.map(mes => {
      const entregasDoMes = historicoEntregas.filter(h => {
        const mesMap = {
          "Jan": "Jan", "Fev": "Fev", "Mar": "Mar", "Abr": "Abr",
          "May": "Mai", "Jun": "Jun", "Jul": "Jul", "Aug": "Ago",
          "Sep": "Set", "Oct": "Out", "Nov": "Nov", "Dec": "Dez"
        };
        return h.mes === mes || mesMap[h.mes] === mes;
      });
      const atrasos = entregasDoMes.filter(h => h.atraso > 0);
      return atrasos.length;
    });
  }

  // Calcula estatísticas para exibir
  const totalAtrasos = atrasosPorMes.reduce((a, b) => a + b, 0);
  const mesesComAtraso = atrasosPorMes.filter(a => a > 0).length;
  const maiorAtraso = Math.max(...atrasosPorMes);
  const mesMaiorAtraso = maiorAtraso > 0 ? meses[atrasosPorMes.indexOf(maiorAtraso)] : '';

  // Atualiza informações textuais com cards modernos
  const infoContainer = document.querySelector('#chartFourteen-info');
  if (infoContainer) {
    infoContainer.innerHTML = `
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-error-50 to-error-100 p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:from-error-500/10 dark:to-error-600/10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-error-600 dark:text-error-400 mb-2">Total de Atrasos</p>
              <p class="text-3xl font-bold text-error-700 dark:text-error-300">${totalAtrasos}</p>
            </div>
            <div class="rounded-full bg-error-200/50 p-3 dark:bg-error-500/20">
              <svg class="h-6 w-6 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-warning-50 to-warning-100 p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:from-warning-500/10 dark:to-warning-600/10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-warning-600 dark:text-warning-400 mb-2">Meses com Atraso</p>
              <p class="text-3xl font-bold text-warning-700 dark:text-warning-300">${mesesComAtraso}</p>
            </div>
            <div class="rounded-full bg-warning-200/50 p-3 dark:bg-warning-500/20">
              <svg class="h-6 w-6 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:from-gray-800/50 dark:to-gray-800/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Maior Atraso</p>
              <p class="text-3xl font-bold text-gray-800 dark:text-white">${maiorAtraso > 0 ? maiorAtraso : '0'}</p>
              ${mesMaiorAtraso ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${mesMaiorAtraso}</p>` : ''}
            </div>
            <div class="rounded-full bg-gray-200/50 p-3 dark:bg-gray-700/50">
              <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Atualiza o gráfico
  const updateChart = () => {
    if (window.chartFourteenInstance) {
      window.chartFourteenInstance.updateSeries([
        { name: "Quantidade de Atrasos", data: atrasosPorMes }
      ]);
      window.chartFourteenInstance.updateOptions({ 
        xaxis: { categories: meses }
      });
      return true;
    }
    return false;
  };

  // Tenta atualizar imediatamente
  if (!updateChart()) {
    // Se não conseguiu, tenta novamente após um delay
    setTimeout(() => {
      if (!updateChart()) {
        // Se ainda não conseguiu, tenta mais uma vez
        setTimeout(updateChart, 1000);
      }
    }, 500);
  }
}

// Atualiza Estatísticas PCM (cards e tabela de fornecedores)
export function atualizarEstatisticasPCM(dados) {
  // Atualiza cards de métricas
  const comprasMes = document.querySelector('[data-metric="compras-mes"]');
  const fornecedoresAtivos = document.querySelector('[data-metric="fornecedores-ativos"]');
  const itensEstoque = document.querySelector('[data-metric="itens-estoque"]');
  const taxaPontualidade = document.querySelector('[data-metric="taxa-pontualidade"]');

  // Dados fictícios ou reais
  const comprasValor = dados?.comprasMensaisGlobal?.reduce((acc, c) => acc + (c.valor || 0), 0) || 125000;
  const fornecedoresCount = dados?.fornecedores?.length || 8;
  const produtosCount = dados?.produtos?.length || 1250;
  const pontualidadeMedia = dados?.rankingFornecedores?.reduce((acc, f) => acc + (f.taxaPontualidade || 0), 0) / (dados?.rankingFornecedores?.length || 1) || 87.5;

  if (comprasMes) comprasMes.textContent = `R$ ${comprasValor.toLocaleString('pt-BR')}`;
  if (fornecedoresAtivos) fornecedoresAtivos.textContent = fornecedoresCount.toLocaleString('pt-BR');
  if (itensEstoque) itensEstoque.textContent = produtosCount.toLocaleString('pt-BR');
  if (taxaPontualidade) taxaPontualidade.textContent = `${pontualidadeMedia.toFixed(1)}%`;

  // Atualiza tabela de fornecedores
  const tbody = document.querySelector('[data-table="fornecedores-pcm"]');
  if (!tbody) return;

  // Dados fictícios de fornecedores
  const fornecedoresData = dados?.rankingFornecedores || [
    { nome: "Fornecedor A", pedidos: 45, valor: 125000, pontualidade: 95.5 },
    { nome: "Fornecedor B", pedidos: 32, valor: 89000, pontualidade: 88.2 },
    { nome: "Fornecedor C", pedidos: 28, valor: 67000, pontualidade: 92.1 },
    { nome: "Fornecedor D", pedidos: 19, valor: 45000, pontualidade: 76.8 },
  ];

  tbody.innerHTML = fornecedoresData.map((fornecedor) => {
    const pontualidadeClass = fornecedor.pontualidade >= 90 
      ? 'text-success-600 dark:text-success-400' 
      : fornecedor.pontualidade >= 80 
      ? 'text-warning-600 dark:text-warning-400' 
      : 'text-error-600 dark:text-error-400';
    
    return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-4 px-4">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
              <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                ${fornecedor.nome.charAt(0)}
              </span>
            </div>
            <p class="text-sm font-semibold text-gray-800 dark:text-white/90">
              ${fornecedor.nome}
            </p>
          </div>
        </td>
        <td class="py-4 px-4 text-right">
          <p class="text-sm font-bold text-gray-800 dark:text-white/90">
            ${fornecedor.pedidos.toLocaleString('pt-BR')}
          </p>
        </td>
        <td class="py-4 px-4 text-right">
          <p class="text-sm font-bold text-gray-800 dark:text-white/90">
            R$ ${fornecedor.valor.toLocaleString('pt-BR')}
          </p>
        </td>
        <td class="py-4 px-4 text-center">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${pontualidadeClass} bg-opacity-10">
            ${fornecedor.pontualidade.toFixed(1)}%
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// Atualiza tabela de Pedidos e Solicitações Recentes
export function atualizarTabelaPedidosSolicitacoes(dados) {
  const tbody = document.querySelector('[data-table="pedidos-solicitacoes"]');
  if (!tbody) return;

  // Dados fictícios de pedidos e solicitações recentes
  const pedidosSolicitacoes = dados?.pedidosSolicitacoes || [
    {
      tipo: "Pedido de Compra",
      numero: "PC-2024-001",
      produto: "Parafuso M6x20 Inox",
      quantidade: 1500,
      valor: 1275.00,
      fornecedor: "Fornecedor A",
      status: "Em Trânsito",
      dataEmissao: "2024-01-10",
      dataEntrega: "2024-01-25",
      statusColor: "warning"
    },
    {
      tipo: "Solicitação de Compra",
      numero: "SC-2024-045",
      produto: "Chapa de Aço 3mm",
      quantidade: 300,
      valor: 13650.00,
      fornecedor: "Fornecedor B",
      status: "Aguardando Aprovação",
      dataEmissao: "2024-01-18",
      dataEntrega: null,
      statusColor: "info"
    },
    {
      tipo: "Pedido de Compra",
      numero: "PC-2024-002",
      produto: "Parafuso M8x30 Inox",
      quantidade: 800,
      valor: 1040.00,
      fornecedor: "Fornecedor A",
      status: "Entregue",
      dataEmissao: "2024-01-05",
      dataEntrega: "2024-01-20",
      statusColor: "success"
    },
    {
      tipo: "Solicitação de Compra",
      numero: "SC-2024-046",
      produto: "Tubo de Alumínio 50mm",
      quantidade: 120,
      valor: 8400.00,
      fornecedor: "Fornecedor C",
      status: "Aprovada",
      dataEmissao: "2024-01-15",
      dataEntrega: null,
      statusColor: "success"
    },
    {
      tipo: "Pedido de Compra",
      numero: "PC-2024-003",
      produto: "Porca M6 Inox",
      quantidade: 2000,
      valor: 600.00,
      fornecedor: "Fornecedor A",
      status: "Atrasado",
      dataEmissao: "2024-01-12",
      dataEntrega: "2024-01-24",
      statusColor: "error"
    },
    {
      tipo: "Solicitação de Compra",
      numero: "SC-2024-047",
      produto: "Vedação de Borracha",
      quantidade: 500,
      valor: 1250.00,
      fornecedor: "Fornecedor D",
      status: "Em Análise",
      dataEmissao: "2024-01-27",
      dataEntrega: null,
      statusColor: "warning"
    },
  ];

  // Ordena por data de emissão (mais recente primeiro)
  const ordenado = [...pedidosSolicitacoes].sort((a, b) => {
    return new Date(b.dataEmissao) - new Date(a.dataEmissao);
  });

  tbody.innerHTML = ordenado.map((item) => {
    const dataEmissaoFormatada = item.dataEmissao 
      ? new Date(item.dataEmissao).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : '-';
    
    const dataEntregaFormatada = item.dataEntrega 
      ? new Date(item.dataEntrega).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : '-';

    const statusClasses = {
      success: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
      warning: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500',
      error: 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500',
      info: 'bg-info-50 text-info-700 dark:bg-info-500/15 dark:text-info-500',
    };

    const tipoIcon = item.tipo === "Pedido de Compra" 
      ? '<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
      : '<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>';

    const tipoColor = item.tipo === "Pedido de Compra"
      ? 'text-primary-600 dark:text-primary-400'
      : 'text-info-600 dark:text-info-400';

    return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-4 px-4">
          <div class="flex items-center gap-2">
            <div class="${tipoColor}">
              ${tipoIcon}
            </div>
            <span class="text-sm font-medium text-gray-800 dark:text-white/90">
              ${item.tipo === "Pedido de Compra" ? "Pedido" : "Solicitação"}
            </span>
          </div>
        </td>
        <td class="py-4 px-4">
          <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
            ${item.numero}
          </span>
        </td>
        <td class="py-4 px-4">
          <span class="text-sm font-medium text-gray-800 dark:text-white/90">
            ${item.produto}
          </span>
        </td>
        <td class="py-4 px-4 text-right">
          <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
            ${item.quantidade.toLocaleString('pt-BR')}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">un</span>
        </td>
        <td class="py-4 px-4 text-right">
          <span class="text-sm font-bold text-gray-800 dark:text-white/90">
            R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </td>
        <td class="py-4 px-4">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            ${item.fornecedor}
          </span>
        </td>
        <td class="py-4 px-4 text-center">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusClasses[item.statusColor]}">
            ${item.status}
          </span>
        </td>
        <td class="py-4 px-4 text-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            ${dataEmissaoFormatada}
          </span>
        </td>
        <td class="py-4 px-4 text-center">
          <span class="text-sm ${item.dataEntrega ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}">
            ${dataEntregaFormatada}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}


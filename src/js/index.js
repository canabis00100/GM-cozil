import "jsvectormap/dist/jsvectormap.min.css";
import "flatpickr/dist/flatpickr.min.css";
import "dropzone/dist/dropzone.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import Dropzone from "dropzone";

import chart01 from "./components/charts/chart-01";
import chart02 from "./components/charts/chart-02";
import chart03 from "./components/charts/chart-03";
import chart04 from "./components/charts/chart-04";
import chart05 from "./components/charts/chart-05";
import chart06 from "./components/charts/chart-06";
import chart07 from "./components/charts/chart-07";
import chart08 from "./components/charts/chart-08";
import chart09 from "./components/charts/chart-09";
import chart10 from "./components/charts/chart-10";
import chart11 from "./components/charts/chart-11";
import chart12 from "./components/charts/chart-12";
import chart13 from "./components/charts/chart-13";
import chart14 from "./components/charts/chart-14";
import chart15 from "./components/charts/chart-15";
import chart16 from "./components/charts/chart-16";
import chartIndividual01 from "./components/charts/chart-individual-01";
import chartIndividual02 from "./components/charts/chart-individual-02";
import chartIndividual03 from "./components/charts/chart-individual-03";
import chartIndividual04 from "./components/charts/chart-individual-04";
import chartIndividual05 from "./components/charts/chart-individual-05";
import map01 from "./components/map-01";
import mapFornecedores from "./components/map-fornecedores";
import "./components/calendar-init.js";
import "./components/image-resize";
import pcmState from "./pcmState";
import { atualizarMetricas, atualizarGraficos, atualizarTabelas } from "./components/pcm-updater";
import auth from "./utils/auth";

Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();

// Init flatpickr
flatpickr(".datepicker", {
  mode: "range",
  static: true,
  monthSelectorType: "static",
  dateFormat: "M j, Y",
  defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
  prevArrow:
    '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.25 6L9 12.25L15.25 18.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  nextArrow:
    '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 19L15 12.75L8.75 6.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  onReady: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
    const customClass = instance.element.getAttribute("data-class");
    instance.calendarContainer.classList.add(customClass);
  },
  onChange: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
  },
});

// Init Dropzone
const dropzoneArea = document.querySelectorAll("#demo-upload");

if (dropzoneArea.length) {
  let myDropzone = new Dropzone("#demo-upload", { url: "/file/post" });
}

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Proteção de rotas - verificar autenticação apenas se não estiver na página de login
  const currentPath = window.location.pathname || window.location.href;
  if (!currentPath.includes('signin.html') && !auth.isAuthenticated()) {
    window.location.href = 'signin.html';
    return;
  }

  // Se estiver na página de login, não continuar
  if (currentPath.includes('signin.html')) {
    return;
  }

  chart01();
  chart02();
  chart03();
  chart04();
  chart05();
  chart06();
  chart07();
  chart08();
  chart09();
  chart10();
  chart11();
  chart12();
  chart13();
  chart14();
  chart15();
  chart16();
  chartIndividual01();
  chartIndividual02();
  chartIndividual03();
  chartIndividual04();
  chartIndividual05();
  map01();
  mapFornecedores();
});

// Get the current year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// For Copy//
document.addEventListener("DOMContentLoaded", () => {
  const copyInput = document.getElementById("copy-input");
  if (copyInput) {
    // Select the copy button and input field
    const copyButton = document.getElementById("copy-button");
    const copyText = document.getElementById("copy-text");
    const websiteInput = document.getElementById("website-input");

    // Event listener for the copy button
    copyButton.addEventListener("click", () => {
      // Copy the input value to the clipboard
      navigator.clipboard.writeText(websiteInput.value).then(() => {
        // Change the text to "Copied"
        copyText.textContent = "Copied";

        // Reset the text back to "Copy" after 2 seconds
        setTimeout(() => {
          copyText.textContent = "Copy";
        }, 2000);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Function to focus the search input
  function focusSearchInput() {
    if (searchInput) searchInput.focus();
  }

  // Logout button
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      auth.logout();
    });
  }

  // Add click event listener to the search button
  if (searchButton) {
    searchButton.addEventListener("click", focusSearchInput);
  }

  // Add keyboard event listener for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  document.addEventListener("keydown", function (event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault(); // Prevent the default browser behavior
      focusSearchInput();
    }
  });

  // Add keyboard event listener for "/" key
  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== searchInput && searchInput) {
      event.preventDefault(); // Prevent the "/" character from being typed
      focusSearchInput();
    }
  });

  // Sistema PCM - Busca de produtos (Desktop e Mobile)
  const searchInputMobile = document.getElementById("search-input-mobile");
  const allSearchInputs = [searchInput, searchInputMobile].filter(Boolean);
  
  allSearchInputs.forEach((input) => {
    if (!input) return;
    
    let searchTimeout;
    
    // Busca ao digitar (com debounce)
    input.addEventListener("input", function (event) {
      clearTimeout(searchTimeout);
      
      // Sincronizar ambos os inputs
      allSearchInputs.forEach(otherInput => {
        if (otherInput !== input) {
          otherInput.value = input.value;
        }
      });
      const codigo = event.target.value.trim();
      
      searchTimeout = setTimeout(() => {
        pcmState.buscarProduto(codigo);
      }, 500); // Aguarda 500ms após parar de digitar
    });

    // Busca ao pressionar Enter
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        clearTimeout(searchTimeout);
        const codigo = input.value.trim();
        if (codigo) {
          searchProduct(codigo);
        } else {
          pcmState.setModoGlobal();
        }
      }
    });
  });

  // Listener para mudanças de estado PCM
  pcmState.onStateChange((modo, dados) => {
    atualizarMetricas(dados, modo);
    // Aguarda um pouco para garantir que os gráficos foram inicializados
    setTimeout(() => {
      atualizarGraficos(dados, modo);
    }, 1000);
    atualizarTabelas(dados, modo);
    
    // Se estiver em modo individual, atualiza estatísticas PCM
    // Gráficos individuais são atualizados automaticamente
  });

  // Observer para detectar quando a seção individual aparece
  const observer = new MutationObserver((mutations) => {
    const secaoIndividual = document.getElementById('secao-individual');
    if (secaoIndividual && !secaoIndividual.classList.contains('hidden')) {
      // Seção individual está visível, força atualização dos gráficos
      const atualizarDados = () => {
        const modoAtual = pcmState.getModo();
        const dadosAtuais = pcmState.getDados();
        if (modoAtual) {
          atualizarGraficos(dadosAtuais || {}, modoAtual);
        }
      };
      
      // Atualiza imediatamente e em múltiplos momentos
      atualizarDados();
      setTimeout(atualizarDados, 100);
      setTimeout(atualizarDados, 300);
      setTimeout(atualizarDados, 600);
    }
  });

  // Observa mudanças na seção individual
  const secaoIndividual = document.getElementById('secao-individual');
  if (secaoIndividual) {
    observer.observe(secaoIndividual, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Se a seção individual já estiver visível ao carregar, atualiza imediatamente
    if (!secaoIndividual.classList.contains('hidden')) {
      setTimeout(() => {
        const modoAtual = pcmState.getModo();
        const dadosAtuais = pcmState.getDados();
        if (modoAtual) {
          atualizarGraficos(dadosAtuais || {}, modoAtual);
        }
      }, 500);
    }
  }
  
  // Verifica periodicamente se a seção individual está visível e atualiza
  setInterval(() => {
    const secao = document.getElementById('secao-individual');
    if (secao && !secao.classList.contains('hidden')) {
      const modoAtual = pcmState.getModo();
      const dadosAtuais = pcmState.getDados();
      if (modoAtual) {
        atualizarGraficos(dadosAtuais || {}, modoAtual);
      }
    }
  }, 2000);

  // Aguarda inicialização dos gráficos antes de iniciar o sistema PCM
  setTimeout(() => {
    // Inicializa sistema PCM em modo GLOBAL
    pcmState.setModoGlobal();
    
    // Inicia atualização automática
    pcmState.iniciarAutoUpdate();
  }, 1500);

  // Observer para mudanças de tema (dark/light mode)
  const themeObserver = new MutationObserver(() => {
    // Quando o tema muda, atualiza os gráficos
    setTimeout(() => {
      const modo = pcmState.getModo();
      const dados = pcmState.getDados();
      if (dados) {
        atualizarGraficos(dados, modo);
      }
    }, 100);
  });

  // Observa mudanças na classe 'dark' do documento
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

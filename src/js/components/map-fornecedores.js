import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world";

const mapFornecedores = () => {
  const mapSelector = document.querySelectorAll("#mapFornecedores");

  if (mapSelector.length) {
    const map = new jsVectorMap({
      selector: "#mapFornecedores",
      map: "world",
      zoomButtons: false,

      regionStyle: {
        initial: {
          fontFamily: "Outfit",
          fill: "#D9D9D9",
        },
        hover: {
          fillOpacity: 1,
          fill: "#465fff",
        },
      },
      markers: [
        {
          name: "Estados Unidos",
          coords: [37.0902, -95.7129],
        },
        {
          name: "França",
          coords: [46.2276, 2.2137],
        },
        {
          name: "Brasil",
          coords: [-14.2350, -51.9253],
        },
      ],

      markerStyle: {
        initial: {
          strokeWidth: 2,
          fill: "#465fff",
          fillOpacity: 1,
          r: 6,
        },
        hover: {
          fill: "#7C3AED",
          fillOpacity: 1,
          r: 8,
        },
        selected: {},
        selectedHover: {},
      },

      onRegionTooltipShow: function (tooltip, code) {
        // Tooltip customizado para regiões
      },
      
      onMarkerTooltipShow: function (tooltip, index) {
        const markers = [
          { name: "Estados Unidos", count: "2 Fornecedores" },
          { name: "França", count: "1 Fornecedor" },
          { name: "Brasil", count: "1 Fornecedor" },
        ];
        if (markers[index]) {
          tooltip.selector.innerHTML = 
            `<b>${markers[index].name}</b><br/>${markers[index].count}`;
        }
      },
    });
    
    window.mapFornecedoresInstance = map;
  }
};

export default mapFornecedores;


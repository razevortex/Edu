    const datasets = [
      {
        label: 'Technologie A',
        data: [
          { x: new Date(2000, 0), y: 1e3, info: 'Erste Version', link: '#', image: 'https://via.placeholder.com/150' },
          { x: new Date(2002, 0), y: 1e6, info: 'Durchbruch', link: '#', image: 'https://via.placeholder.com/150' },
		  { x: new Date(2004, 0), y: 1e3, info: 'Durchbruch', link: '#', image: 'https://via.placeholder.com/150' },
		  { x: new Date(2008, 0), y: 1e5, info: 'Durchbruch', link: '#', image: 'https://via.placeholder.com/150' },
		  { x: new Date(2009, 0), y: 1e6, info: 'Durchbruch', link: '#', image: 'https://via.placeholder.com/150' },
          { x: new Date(2020, 0), y: 1e9, info: 'Aktuell', link: '#', image: 'https://via.placeholder.com/150' }
        ],
        borderColor: '#FF6384',
      },
      {
        label: 'Technologie B',
        data: [
          { x: new Date(1995, 0), y: 1e2, info: 'Prototyp', link: '#', image: 'https://via.placeholder.com/150' },
          { x: new Date(2005, 0), y: 1e5, info: 'Optimierung', link: '#', image: 'https://via.placeholder.com/150' },
          { x: new Date(2022, 0), y: 1e8, info: 'Update', link: '#', image: 'https://via.placeholder.com/150' }
        ],
        borderColor: '#36A2EB',
      }
    ];

    // Chart-Konfiguration
    const config = {
      type: 'line',
      data: { datasets },
      options: {
	      animations: {
      tension: {
        duration: 3000,
        easing: 'linear',
        from: .4,
        to: 0,
        loop: true
      }
    },
        scales: {
          x: {
            type: 'time',
            time: { unit: 'year' },
            title: { display: true, text: 'Jahr' }
          },
          y: {
            type: 'logarithmic',
            title: { display: true, text: 'Leistung (logarithmisch)' },
            ticks: {
              callback: (value) => '10^' + Math.log10(value)
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: false, // Deaktiviere Standard-Tooltips
            external: (context) => {
              // Custom Tooltip mit Bildern/Links
              const tooltip = document.getElementById('tooltip');
              if (context.tooltip.opacity === 0) {
                tooltip.style.display = 'none';
                return;
              }

              const dataPoint = context.tooltip.dataPoints[0].raw;
              tooltip.innerHTML = `
                <h3>${dataPoint.info}</h3>
                <img src="${dataPoint.image}" class="tooltip-image">
                <p><a href="${dataPoint.link}" target="_blank">Mehr erfahren</a></p>
              `;

              const chartRect = context.chart.canvas.getBoundingClientRect();
              tooltip.style.left = chartRect.left + context.tooltip.caretX + 'px';
              tooltip.style.top = chartRect.top + context.tooltip.caretY + 'px';
              tooltip.style.display = 'block';
            }
          }
        }
      }
    };

    // Chart erstellen
    const myChart = new Chart(document.getElementById('myChart'), config);

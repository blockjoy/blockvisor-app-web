const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

var { id, disk_space_name, is_node } = params;

console.log("params", { id, disk_space_name, is_node })

var host = `https://magellan-1.slc.blockjoy.com/host/${id}`;
// var host = 'https://magellan-1.slc.blockjoy.com/host/magellan-1.slc.blockjoy.com'
// var host = 'https://magellan-1.slc.blockjoy.com/spaces/magellan-1slcblockjoycom/rooms/local/nodes/fdf3144c-2cb4-11ee-b56e-96304f06953d/dashboard.js';

const sidePanelTextonlyWidth = "160px",
      sidePanelTextonlyHeight = "55px",
      sidePanelSparklineHeight = "40px";

const charts = [
  {
    title: "Load",
    charts: [
      {
        netdata: "system.load",
        library: "easypiechart",
        units: "Avg.",
        title: "",
        dimensions: "load1",
        width: sidePanelTextonlyWidth,
        height: sidePanelTextonlyHeight, 
      },
      {
        netdata: "system.load",
        dygraphValueRange: "[0, 100]",
        width: "100%",
        height: sidePanelSparklineHeight,
        color: "#bff589",
        decimalDigits: "-1",
        dimensions: "load1",
        dygraphSparkline: "sparkline"
      }
    ]
  },
  {
    title: "CPU",
    charts: [
      {
        netdata: "system.cpu",
        library: "easypiechart",
        units: "%",
        title: "",
        width: sidePanelTextonlyWidth,
        height: sidePanelTextonlyHeight, 
      },
      {
        netdata: "system.cpu",
        dygraphValueRange: "[0, 100]",
        width: "100%",
        height: sidePanelSparklineHeight,
        color: "#5F615D #5F615D #5F615D #5F615D #5F615D #5F615D #bff589 #bff589",
        decimalDigits: "-1",
        dygraphSparkline: "sparkline"
      }
    ]
  },
  {
    title: "Disk Write",
    measurement: "MiB/s",
    charts: [
      {
        netdata: "system.io",
        dimensions: "out",
        library: "easypiechart",
        title: "",
        width: sidePanelTextonlyWidth,
        height: sidePanelTextonlyHeight, 
      },
      {
        netdata: "system.io",
        dygraphValueRange: "[0, 100]",
        width: "100%",
        height: sidePanelSparklineHeight,
        dimensions: "out",
        color: "#bff589 #bff589",
        decimalDigits: "-1",
        dygraphSparkline: "sparkline"
      }
    ]
  },
  {
    title: "Disk Read",
    measurement: "MiB/s",
    charts: [
      {
        netdata: "system.io",
        dimensions: "in",
        library: "easypiechart",
        title: "",
        width: sidePanelTextonlyWidth,
        height: sidePanelTextonlyHeight, 
      },
      {
        netdata: "system.io",
        dygraphValueRange: "[0, 100]",
        width: "100%",
        height: sidePanelSparklineHeight,
        dimensions: "in",
        color: "#bff589 #bff589",
        decimalDigits: "-1",
        dygraphSparkline: "sparkline"
      }
    ]
  },
];

if (is_node) {
  charts.unshift({
    title: "RPC Requests",
    measurement: "Req/S",
    charts: [
      {
        netdata: "web_log_nginx.requests",
        textonlyDecimalPlaces: "0",
        library: "textonly",
        title: "",
        width: sidePanelTextonlyWidth,
        height: sidePanelTextonlyHeight, 
      },
      {
        netdata: "web_log_nginx.requests",
        width: "100%",
        height: sidePanelSparklineHeight,
        color: "#bff589 #bff589",
        decimalDigits: "-1",
        dygraphSparkline: "sparkline"
      }
    ]
  },)
}

const colorPrimary = "#bff589";
const size = "140px";
const after = "-600";

const createChart = (chart) => {
  const element = document.createElement("div");
  element.setAttribute("data-netdata", chart.netdata);
  element.setAttribute("data-host", host);
  element.setAttribute("data-colors", chart.color || colorPrimary);
  element.setAttribute("data-height", size);
  element.setAttribute("data-width", "100%");
  element.setAttribute("data-after", after);
  element.setAttribute("data-title", "");

  if (chart.units) {
    element.setAttribute("data-units", chart.units);
  }

  if (chart.library) {
    element.setAttribute("data-chart-library", chart.library);
  }

  if (chart.width) {
    element.setAttribute("data-width", chart.width);
  }

  if (chart.height) {
    element.setAttribute("data-height", chart.height);
  }

  if (chart.dimensions) {
    element.setAttribute("data-dimensions", chart.dimensions);
  }

  if (chart.maxValue) {
    element.setAttribute("data-easypiechart-max-value", chart.maxValue);
  }

  if (chart.gaugeMaxValue) {
    element.setAttribute("data-gauge-max-value", chart.gaugeMaxValue);
  }

  if (chart.appendOptions) {
    element.setAttribute("data-append-options", chart.appendOptions);
  }

  if (chart.commonUnits) {
    element.setAttribute("data-common-units", chart.commonUnits);
  }

  if (chart.appendOptions) {
    element.setAttribute("data-append-options", chart.appendOptions);
  }

  if (chart.dygraphValueRange) {
    element.setAttribute("data-dygraph-value-range", chart.dygraphValueRange);
  }

  if (chart.dygraphSparkline) {
    element.setAttribute("data-dygraph-theme", "sparkline");
  }

  if (chart.decimalDigits) {
    element.setAttribute("data-decimal-digits", chart.decimalDigits);
  }

  if (chart.legendPosition) {
    element.setAttribute("data-legend-position", chart.legendPosition);
  }

  if (chart.textonlyDecimalPlaces) {
    element.setAttribute("data-textonly-decimal-places", chart.textonlyDecimalPlaces);
  }

  return element;
}

const createDiskSpaceChart = () => {
  const element = document.createElement("div");
  element.setAttribute("data-netdata", `disk_space.${disk_space_name}`);
  element.setAttribute("data-chart-library", "d3pie");
  element.setAttribute("data-host", host);
  element.setAttribute("data-colors", "#bff589 #5F615D #a7a7a7");
  element.setAttribute("data-d3pie-pieinnerradius", "90%");
  element.setAttribute("data-d3pie-pieouterradius", "100%");
  element.setAttribute("data-height", "200px");
  element.setAttribute("data-width", "100%");
  element.setAttribute("data-after", after);
  element.setAttribute("data-points", "60");
  element.setAttribute("data-dt-element-name", "time901");
  return element;
}

const onLoad = () => {
  charts.forEach((block) => {

    const row = document.createElement("div");
    row.setAttribute("class", "row");

    const header = document.createElement("header");
    header.innerText = block.title;

    const chartsDiv = document.createElement("div");
    chartsDiv.setAttribute("class", "charts");

    row.appendChild(header);
    row.appendChild(chartsDiv)
    
    if (block.charts[0].netdata) {
      const textonlyWrapper = document.createElement("div");
      textonlyWrapper.setAttribute("class", "textonly-wrapper");
  
      const textonlyChart = createChart(block.charts[0]);
      textonlyChart.setAttribute("id", block.title);
  
      textonlyWrapper.appendChild(textonlyChart);
      
      if (block.measurement) {
        const measurement = document.createElement("div");
        measurement.setAttribute("class", "measurement");
        measurement.innerText = block.measurement;
        
        textonlyWrapper.appendChild(measurement);
      }

      chartsDiv.appendChild(textonlyWrapper);
    }

    const sparklineChart = createChart(block.charts[1]);

    chartsDiv.appendChild(sparklineChart);

    main.appendChild(row);
  });

  const diskSpaceChart = createDiskSpaceChart();
  const diskPie = document.querySelector(".disk-pie");
  diskPie.appendChild(diskSpaceChart);
}


onLoad();
// document.addEventListener("DOMContentLoaded", onLoad);
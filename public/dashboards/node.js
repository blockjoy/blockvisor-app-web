
const sidePanelTextonlyWidth = "150px",
      sidePanelTextonlyHeight = "60px",
      sidePanelSparklineHeight = "44px";

const loadSidePanelCharts = [
  {
    title: "Load Avg.",
    charts: [
      {
        netdata: "system.load",
        library: "textonly",
        title: "",
        textonlyDecimalPlaces: "2",
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
        library: "textonly",
        title: "",
        textonlyDecimalPlaces: "1",
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
    charts: [
      {
        netdata: "system.io",
        library: "textonly",
        title: "",
        dimensions: "out",
        textonlyDecimalPlaces: "1",
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
    charts: [
      {
        netdata: "system.io",
        library: "textonly",
        title: "",
        dimensions: "in",
        textonlyDecimalPlaces: "1",
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
  }
];

const systemCharts = [
  {
    netdata: "system.cpu",
    library: "easypiechart",
    title: "CPU",
    units: "%",
    width: "75%",
    maxValue: "100",
    points: "300",
  },
  {
    netdata: "system.io",
    library: "easypiechart",
    title: "Disk Read",
    points: "300",
    dimensions: "in",
    commonUnits: "system.io.mainhead",
    units: "MiB/s",
    width: "75%",
    maxValue: "1000",
  },  
  {
    netdata: "system.io",
    library: "easypiechart",
    title: "Disk Write",
    width: "75%",
    points: "300",
    dimensions: "out",
    commonUnits: "system.io.mainhead",
    units: "MiB/s",
    color: "#EE7070",
    maxValue: "1000",
  },  
  {
    netdata: "system.swap",
    library: "easypiechart",
    title: "Used Swap",
    units: "%",
    points: "480",
    maxValue: "100",
    appendOptions: "percentage",
    dimensions: "used",
    color: "#e9c09c",
    width: "75%",
  },
  {
    netdata: "system.ram",
    library: "easypiechart",
    title: "Used Ram",
    units: "%",
    dimensions: "used|buffers|active|wired",
    color: "#e9c09c",
    width: "75%",
    maxValue: "100",
    points: "600",
    appendOptions: "percentage"
  },
  {
    netdata: "system.net",
    library: "easypiechart",
    title: "Net Inbound",
    units: "kilobits/s",
    dimensions: "received",
    width: "75%",
    maxValue: "1000",
  },
  {
    netdata: "system.net",
    library: "easypiechart",
    title: "Net Outbound",
    units: "kilobits/s",
    dimensions: "sent",
    color: "#EE7070",
    width: "75%",
    maxValue: "1000",
  },
];

const loadCharts = [
  {
    netdata: "system.load",
    dygraphValueRange: "[0, 100]",
    width: "100%",
    height: "230px",
    color: "#bff589 #e9af3a #EE7070",
    decimalDigits: "-1",
    legendPosition: "bottom"
  }
];

const colorPrimary = "#bff589";
const size = "140px";
const after = "-600";

const createChart = (chart) => {
  const element = document.createElement("div");
  element.setAttribute("data-netdata", chart.netdata);
  element.setAttribute("data-host", `https://xrp02.db.node.blockjoy.com/host/173-231-22-130.slc.cloud.blockjoy.com`);
  element.setAttribute("data-colors", chart.color || colorPrimary);
  element.setAttribute("data-height", size);
  element.setAttribute("data-width", "100%");
  element.setAttribute("data-units", chart.units);
  element.setAttribute("data-after", after);
  element.setAttribute("data-title", "");

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

const onLoad = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const { is_side_panel } = params;

  // const node_id = "3b78c2f9-e9d5-4982-952e-23bae0fe9da1";

  const system = document.querySelector("#system"),
        load = document.querySelector("#load");
        sidePanel = document.querySelector("#sidePanel");

  console.log("params", params.is_side_panel);

  if (is_side_panel === "true") {
    document.body.classList.add("is-side-panel");
    const main = document.querySelector("main");
    document.body.removeChild(main);

    loadSidePanelCharts.forEach((block) => {

      const row = document.createElement("div");
      row.setAttribute("class", "row");

      const header = document.createElement("header");
      header.innerText = block.title;

      const charts = document.createElement("div");
      charts.setAttribute("class", "charts");

      row.appendChild(header);
      row.appendChild(charts);

      block.charts.forEach((chart) => {
        const element = createChart(chart);
        charts.appendChild(element);
      });  

      sidePanel.appendChild(row);
    });
  
  } else {
    const aside = document.querySelector("aside");
    document.body.removeChild(aside);

    systemCharts.forEach((chart) => {

      const card = document.createElement("article");
      card.setAttribute("class", "card");

      const h2 = document.createElement("h2");
      h2.setAttribute("class", "card-header");
      h2.innerText = chart.title;

      card.appendChild(h2);

      const element = createChart(chart);
      card.appendChild(element);
  
      system.appendChild(card);
    });

    loadCharts.forEach((chart) => {

      const card = document.createElement("article");
      card.setAttribute("class", "card");

      const element = createChart(chart);
      card.appendChild(element);

      load.appendChild(card);
    });
  }

  
}


onLoad();
// document.addEventListener("DOMContentLoaded", onLoad);
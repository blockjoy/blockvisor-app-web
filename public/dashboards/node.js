var systemCharts = [
  // {
  //   netdata: "system.load",
  //   library: "gauge",
  //   title: "LOAD",
  //   units: "",
  //   points: "420",
  //   dimensions: "load1",
  //   gaugeMaxValue: "20",
  //   width: "75%",
  // },  
  {
    netdata: "system.load",
    library: "easypiechart",
    title: "LOAD",
    units: "Average",
    dimensions: "load1",
    width: "65%",
    maxValue: "20",
  },
  // {
  //   netdata: "system.cpu",
  //   library: "gauge",
  //   title: "CPU",
  //   units: "",
  //   points: "420",
  //   gaugeMaxValue: "100",
  //   width: "75%",
  // },
  {
    netdata: "system.cpu",
    library: "easypiechart",
    title: "CPU",
    units: "%",
    width: "65%",
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
    width: "65%",
    maxValue: "1000",
  },  
  {
    netdata: "system.io",
    library: "easypiechart",
    title: "Disk Write",
    width: "65%",
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
    width: "65%",
  },
  {
    netdata: "system.ram",
    library: "easypiechart",
    title: "Used Ram",
    units: "%",
    dimensions: "used|buffers|active|wired",
    color: "#e9c09c",
    width: "65%",
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
    width: "65%",
    maxValue: "1000",
  },
  {
    netdata: "system.net",
    library: "easypiechart",
    title: "Net Outbound",
    units: "kilobits/s",
    dimensions: "sent",
    color: "#EE7070",
    width: "65%",
    maxValue: "1000",
  },
];

const onLoad = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  //const { node_id } = params;
  const node_id = "3b78c2f9-e9d5-4982-952e-23bae0fe9da1";
  const colorPrimary = "#bff589";
  const size = "140px";
  const after = "-600";
  const system = document.querySelector("#system");

  systemCharts.forEach((chart) => {
    const element = document.createElement("div");
    element.setAttribute("data-netdata", chart.netdata);
    element.setAttribute("data-host", `https://xrp02.db.node.blockjoy.com/host/173-231-22-130.slc.cloud.blockjoy.com`);
    element.setAttribute("data-colors", chart.color || colorPrimary);
    element.setAttribute("data-chart-library", chart.library);
    element.setAttribute("data-height", size);
    element.setAttribute("data-width", "100%");
    element.setAttribute("data-units", chart.units);
    element.setAttribute("data-after", after);
    element.setAttribute("data-title", chart.title);

    if (chart.width) {
      element.setAttribute("data-width", chart.width);
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

    const card = document.createElement("article");
    card.setAttribute("class", "card aspect-ratio");
    card.appendChild(element);

    system.appendChild(card);
  }
);
}


onLoad();
// document.addEventListener("DOMContentLoaded", onLoad);
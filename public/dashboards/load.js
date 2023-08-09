const preloader = document.querySelector("#preloader");

function loadScript(url, callback) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(script.readyState) { 
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.body.appendChild( script );
}

loadScript(`${host}/dashboard.js`, () => {
  NETDATA.options.current.stop_updates_when_focus_is_lost = false;
  NETDATA.themes.slate.easypiechart_track = "#363938";
  NETDATA.options.current.update_only_visible = false;
  NETDATA.options.current.destroy_on_hide = false;
  
  setTimeout(() => {
    // check if charts have an error
    const textonlyCharts = document.querySelectorAll('.netdata-container');
    textonlyCharts.forEach(chart => {
      // only textonly charts have an id
      if (chart.id && !+chart.innerHTML) {
        chart.innerHTML = "0";
      }
    })
    preloader.classList.add("hidden");
  }, 3000)
});
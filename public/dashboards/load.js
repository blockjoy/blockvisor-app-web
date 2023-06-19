const preloader = document.querySelector("#preloader");

function loadScript( url, callback ) {
    var script = document.createElement( "script" )
    script.type = "text/javascript";
    if(script.readyState) {  // only required for IE <9
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

  loadScript("https://xrp02.db.node.blockjoy.com/host/173-231-22-130.slc.cloud.blockjoy.com/dashboard.js", function() {

    NETDATA.options.current.stop_updates_when_focus_is_lost = false;
    NETDATA.themes.slate.easypiechart_track = "#363938";
    NETDATA.options.current.update_only_visible = false;
    NETDATA.options.current.destroy_on_hide = false;

    setTimeout(() => preloader.classList.add("hidden"), 3000)
  });
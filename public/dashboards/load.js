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
  NETDATA.options.current.update_only_visible = false;
  NETDATA.themes.slate.easypiechart_track = "#363938";
  NETDATA.options.current.destroy_on_hide = false;
});
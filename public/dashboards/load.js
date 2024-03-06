const callback = (nextHost) => {
  console.log("NETDATA successfully loaded charts", nextHost)
  NETDATA.options.current.stop_updates_when_focus_is_lost = false;
  NETDATA.options.current.update_only_visible = false;
  NETDATA.themes.slate.easypiechart_track = "#363938";
  NETDATA.options.current.destroy_on_hide = false;

  onLoad(nextHost);
};

function loadScript() {
  let host = `https://magellan-1.slc.blockjoy.com/host/${name}`;
  var url = `${host}/dashboard.js`;
  var script = document.createElement( "script" )
  script.type = "text/javascript";

  console.log("NETDATA host", host);

  if(script.readyState) { 
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback(host);
      }
    };
  } else {
    script.onload = function() {
      callback(host);
    };
  }

  script.src = url;
  script.onerror = () => {  

    var nextScript = document.createElement( "script" )
    nextScript.type = "text/javascript";

    const nextHost = `https://magellan-1.slc.blockjoy.com/host/${id}`;

    console.log("NETDATA nextHost", nextHost);
    console.log("NETDATA diskSpaceName", diskSpaceName);

    nextScript.src = `${nextHost}/dashboard.js`;
    nextScript.onerror = () => console.error("NETDATA failed to load from id");

    console.error("NETDATA failed to load from name");

    if(nextScript.readyState) { 
      nextScript.onreadystatechange = function() {
        if ( nextScript.readyState === "loaded" || nextScript.readyState === "complete" ) {
          nextScript.onreadystatechange = null;
          callback(nextHost);
        }
      };
    } else {
      nextScript.onload = function() {
        callback(nextHost);
      };
    }
    
    document.body.appendChild( nextScript );
  };
  document.body.appendChild( script );
}

loadScript();
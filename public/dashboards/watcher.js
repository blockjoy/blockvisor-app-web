const preloader = document.querySelector("#preloader");

var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    
    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})();

const main = document.querySelector("main");

let isLoaded = false;

observeDOM(main, function(m){ 
  var addedNodes = [], removedNodes = [];

  m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
  m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

  let target = m[0].target;
  let chartValue = +target.innerText;

  if (!isLoaded && chartValue > -1) {
    isLoaded = true;
    preloader.classList.add("hidden");
  } 
});
// const nFormatter = (num) => {
//   if (num >= 1000000000) {
//      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'GiB';
//   }
//   if (num >= 1000000) {
//      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'MiB';
//   }
//   if (num >= 1000) {
//      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'KiB';
//   }
//   return num;
// }

// var observeDOM = (function(){
//   var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

//   return function( obj, callback ){
//     if( !obj || obj.nodeType !== 1 ) return; 

//     if( MutationObserver ){
//       // define a new observer
//       var mutationObserver = new MutationObserver(callback)

//       // have the observer observe for changes in children
//       mutationObserver.observe( obj, { childList:true, subtree:true })
//       return mutationObserver
//     }
    
//     // browser support fallback
//     else if( window.addEventListener ){
//       obj.addEventListener('DOMNodeInserted', callback, false)
//       obj.addEventListener('DOMNodeRemoved', callback, false)
//     }
//   }
// })()


    // format memory available
    // const memoryAvailable = document.querySelector("#Memory");

    // console.log("memoryAvailable", memoryAvailable.innerText);

  //   observeDOM(memoryAvailable, function(m){ 
  //     var addedNodes = [], removedNodes = [];
   
  //     m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
      
  //     m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

  //    console.log('Added:', addedNodes, 'Removed:', removedNodes);
  //     memoryAvailable.innerHTML = nFormatter(+memoryAvailable.innerText);

  //  });
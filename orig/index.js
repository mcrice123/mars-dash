document.addEventListener("DOMContentLoaded", function() { 
    /*const file = new File(['saturn', ' ', 'cassini'], 'saturn-cassini-iess2019-1bar-equipotential.txt', {type: 'text/plain'});

    file.arrayBuffer().then((arrayBuffer) => {
        const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
        console.log(blob);
    });*/
    const fileName = './saturn-cassini-iess2019-1bar-equipotential.txt';

    fetch(fileName)
  .then((res) => res.text())
  .then((text) => {
    // Do something with "text"
   })
  .catch((e) => console.error(e));

});
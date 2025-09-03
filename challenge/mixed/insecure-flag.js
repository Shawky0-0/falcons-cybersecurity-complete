// Insecure script served over HTTP could be tampered with
(function(){
  // Encrypted payload (XOR with key from elsewhere)
  var ENC = [32,36,45,55,39,43,33,23,7,23,31,93,111,71,81,20,12,17,0,55,12,28,6,10,0,31,72,84,107,84,10,4,6,9];
  function xor(bytes, k){return bytes.map(function(b,i){return b ^ k.charCodeAt(i%k.length);});}
  function toAscii(bytes){return bytes.map(function(b){return String.fromCharCode(b);}).join('');}
  var key = window.__MIXED_KEY__ || '';
  if(!key){ return; }
  var el = document.getElementById('out');
  try{
    var dec = toAscii(xor(ENC, key));
    if(el) el.textContent = dec;
  }catch(_e){}
})();

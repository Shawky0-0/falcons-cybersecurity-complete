// Build a small PNG with LSB stego in pixel data (subtle noise)
(function(){
  const FLAG = 'FALCONS{png_trailer_hidden_flag}';
  const w=32,h=32; // small image
  const canvas = document.createElement('canvas');
  canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext('2d');
  const img=ctx.createImageData(w,h);
  // seed random noise
  for(let i=0;i<img.data.length;i+=4){
    img.data[i]=200+((i/4)%5); img.data[i+1]=200; img.data[i+2]=200; img.data[i+3]=255;
  }
  // encode flag bits into blue channel LSBs
  const bits=[]; for(const ch of FLAG){ const code=ch.charCodeAt(0); for(let b=7;b>=0;b--) bits.push((code>>b)&1); }
  for(let i=0;i<bits.length && i/1 < (img.data.length/4); i++){
    const px = i*4; const b = img.data[px+2]; img.data[px+2] = (b & 0xFE) | bits[i];
  }
  ctx.putImageData(img,0,0);
  const a = document.getElementById('dl');
  canvas.toBlob((blob)=>{
    a.href = URL.createObjectURL(blob);
    a.download = 'mystery.png';
  }, 'image/png');
})();

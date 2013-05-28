console.log('js loaded');
if (!Modernizr.svg) {
  (function() {
    var imgs = document.getElementsByTagName('img'),endsWithDotSvg = /.*\.svg$/,i = 0,l = imgs.length;
    // quick for loop
    for(; i < l; ++i) {
      if(imgs[i].src.match(endsWithDotSvg)) {
        imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
      }
    }
  })();
}

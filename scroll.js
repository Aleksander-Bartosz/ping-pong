document.addEventListener("DOMContentLoaded", function() {
   var cout = document.getElementsByClassName('count');
    
    function scroll(el) {
      var scrollEl = document.getElementById(el).offsetTop;
      var start = 0;
      var step = scrollEl/200;
        console.log(step)
      var move = Math.round(step*100)/100;
      var adder =setInterval(function () {
          start=start+move
          if (start>=scrollEl) {
              clearInterval(adder);
          }
          console.log('kaczka');
          window.scrollTo(0, start)
      },8)
    }
    for (var i=0; i<cout.length; i++) {
        cout[i].addEventListener('click', function () {
            var element = this.dataset.id;
            scroll(element);
        });
    }
});

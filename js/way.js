
    let countDown = new Date('Dec 10, 2017 00:00:00').getTime(),
    x = setInterval(function () {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24)),
        document.getElementById('hours').innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        document.getElementById('minutes').innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        document.getElementById('seconds').innerHTML = Math.floor((distance % (1000 * 60)) / 1000)
     if (distance < 0)  location.href='http://dyq1210.github.io/happy.html';  
    

let countDown = new Date('Dec 10, 2023 00:00:00').getTime(),
    x = setInterval(function () {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24)),
        document.getElementById('hours').innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        document.getElementById('minutes').innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        document.getElementById('seconds').innerHTML = Math.floor((distance % (1000 * 60)) / 1000)
     if (distance < 0)  location.href='happy.html'; 
        
        
        //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}

    }, 1000)

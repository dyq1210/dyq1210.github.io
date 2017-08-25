var treeCanvas = document.getElementById("treeAndFlower"),
        tCtx = treeCanvas.getContext('2d'),
        flowerCanvas = document.getElementById("animateFlower"),
        fCtx = flowerCanvas.getContext("2d"),
        cw = window.innerWidth,
        ch = window.innerHeight;
    treeCanvas.width = flowerCanvas.width = cw;
    treeCanvas.height = flowerCanvas.height = ch;
    var flowerList = [],
        rootTop = ch - 150,
        flowerColor = "rgba(255,192,203,.3)", //花色
        flowerColorDeep = "rgba(241,158,194,.5)", //花色深
        treeColor2 = "rgba(255,192,203,.5)", //树枝颜色
        treeColor = "#FFF", //树干颜色
        fallList = [], //飘落樱花列表
        g = 0.01, //重力加速度
        gWind = 0.005, //风力加速度
        limitSpeedY = 1, //Y速度上限
        limitSpeedX = 1; //X速度上限
    fCtx.shadowColor= "#FFF" ;
    fCtx.shadowBlur = 10 ;
    function drawTree(x, y, deg, step) {
      var addDeg = step % 2 === 0 ? 0.1 : -0.1,
          x1 = x + Math.cos(deg + addDeg) * (step + 4) * 0.8,
          y1 = y + Math.sin(deg + addDeg) * (step - 1) * 0.8;
      tCtx.beginPath();
      tCtx.lineWidth = step / 3;
      tCtx.moveTo(x, y);
      tCtx.lineTo(x1, y1);
      tCtx.strokeStyle = step > 5 ? treeColor : treeColor2;
      tCtx.stroke();
      if (step > 20) {
        tCtx.fillStyle = treeColor;
        tCtx.arc(x, y, step / 6, 0, 2 * Math.PI);
        tCtx.fill();
      }
      if (step < 3 || (step < 23 && Math.random() > 0.1)) {
        var color = [flowerColorDeep, flowerColor][Math.round(Math.random() + 0.2)],
            r = 2 + Math.random() * 2;
        tCtx.fillStyle = color;
        tCtx.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI);
        tCtx.fill();
        flowerList.push({
          x: x,
          y: y,
          sx: Math.random() - 0.5,
          sy: 0,
          color: color,
          r: r,
          deg: deg
        });
      }
      step --;
      if (step > 0) {
        drawTree(x1, y1, deg, step);
        if (step % 3 === 0) {
          drawTree(x1, y1, deg + 0.2 + Math.random() * 0.3, Math.round(step/1.13));
        }
        if (step % 3 === 1) {
          drawTree(x1, y1, deg - 0.2 - Math.random() * 0.3, Math.round(step/1.13));
        }
      }
    }
    function update() {
      if (Math.random() > 0.3) {
        fallList.push(flowerList[Math.floor(Math.random() * flowerList.length)]);
      }
      fCtx.clearRect(0, 0, cw, ch);
      for (var i=0; i<fallList.length; i++) {
        var fall = fallList[i];
        if (fall.sy < limitSpeedY) {
          fall.sy += g;
        }
        fall.sx += gWind;
        fall.x += fall.sx;
        fall.y += fall.sy;
        fall.deg += fall.sx * 0.05;
        if (fall.y > rootTop) {
          fallList.splice(i, 1);
          i --;
          continue;
        }
        fCtx.beginPath();
        fCtx.fillStyle = fall.color;
        fCtx.arc(fall.x, fall.y, fall.r, fall.deg, fall.deg + 1.3 * Math.PI);
        fCtx.fill();
      }
      requestAnimationFrame(update);
    }
    drawTree(cw / 2, rootTop, -Math.PI/2, 30);//执行
    update();

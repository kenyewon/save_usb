$(document).ready(function(){


  // 메뉴 클릭 이벤트
  var menu = $(".gnb li")

  menu.click(function(){
      event.preventDefault();
      var idx = $(this).index();
      var Link = $(this).find("a").attr("href");
      var tt = $(Link).offset().top
      $("html, body").stop()
      .animate({scrollTop:tt},1000,"swing",function(){
          quick(idx);
      })
  });

  function quick(n){
  $(".gnb li").removeClass("on");
  $(".gnb li").eq(n).addClass("on");
  }

  // 페이지 상단으로 이동
  $(".go-top, .intro").click(function(){
    $("html, body").stop().animate({scrollTop:0},1000,"swing")
  });

  // 마우스 휠 방향
  $(window).bind('wheel', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
        $("header").removeClass("on");
    }
    else {
        // scroll down
        $("header").addClass("on");
    }

    var location = $(window).scrollTop();
    
    if(location < 100 ){
      $("header").addClass("on");
    }
  });


  // 가로 스크롤 애니
 const horizontal = document.querySelector(".horizontal"); 
    const sections = gsap.utils.toArray(".horizontal > section");

    gsap.to(sections, {
        xPercent: -100 * (sections.length -1),
        ease: "none",
        scrollTrigger: {
            trigger: horizontal,
            start: "top top",
            end: () => "+=" + (horizontal.offsetWidth - innerWidth),
            pin: true,
            scrub: 1,
            snap: {
                snapTo: 1/(sections.length -1),
                inertia: false,
                duration: {min: 0.1, max: 0.1},
            },
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    //흐르는 텍스트
    function createLoopingText(el) {
        const lerp = (current, target, factor) => current * (1 - factor) + target * factor;
      
        const state = {
          el, 
          lerp: {
            current: 0,
            target: 0 
          },
          interpolationFactor: 0.1,
          speed: 0.1, 
          direction: -1
        };
        
        state.el.style.cssText = 'position: relative; display: inline-flex; white-space: nowrap;';
        state.el.children[1].style.cssText = `position: absolute; left: ${100 * -state.direction}%;`;
      
        
        function animate() {
          state.lerp.target += state.speed;
          state.lerp.current = lerp(state.lerp.current, state.lerp.target, state.interpolationFactor);
      
          if (state.lerp.target > 100) {
            state.lerp.current -= state.lerp.target;
            state.lerp.target = 0;
          }
      
          const x = state.lerp.current * state.direction;
          state.el.style.transform = `translateX(${x}%)`;
        }
      
        function render() {
          animate();
          window.requestAnimationFrame(render);
        }
      
        render();
        return state;
      }
      
      document.querySelectorAll('.flex').forEach(el => createLoopingText(el));

      //눈알
     /*  const leftEyes = document.querySelectorAll('.eye_left .eye_ball');
      const rightEyes = document.querySelectorAll('.eye_right .eye_ball');

      const moveEye = (eye, event) => {
        const rect = eye.getBoundingClientRect();
        const x = event.pageX - rect.left;
        const y = event.pageY - rect.top;

        const angle = Math.atan2(y, x);
        const diff = Math.sqrt(x * x, y * y);
        const degrees = angle * 180 / Math.PI;
        const radius = Math.min(8, diff);

        const cappedX = radius * Math.cos(angle);
        const cappedY = radius * Math.sin(angle);

        gsap.to(eye, {
          x: cappedX,
          y: cappedY });

      };

      document.addEventListener('mousemove', e => {
        leftEyes.forEach(eye => {
          moveEye(eye, e);
        });

        rightEyes.forEach(eye => {
          moveEye(eye, e);
        });
      }); */

});
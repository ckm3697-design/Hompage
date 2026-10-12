/* =========================================================
   site-custom.js
   삼원 홈페이지에서 추가한 요소들의 애니메이션 스크립트입니다.
   원본 템플릿 파일(templatehouse.js, style.js)은 건드리지 않고
   여기에만 새 동작을 추가합니다.

   .reveal-up 클래스가 붙은 요소는 화면에 스크롤되어 들어올 때
   아래에서 위로 살짝 올라오며 나타납니다 (템플릿의 다른 섹션들과
   동일한 GSAP ScrollTrigger 방식을 재사용했습니다).
   새 섹션에도 같은 효과를 쓰고 싶다면 해당 요소에 class="reveal-up"만
   추가하면 됩니다 (별도 JS 수정 불필요).
   ========================================================= */
(function () {
  if (typeof gsap === "undefined") return;

  document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".reveal-up");
    items.forEach(function (item, i) {
      gsap.from(item, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: (i % 4) * 0.08,
        scrollTrigger: {
          trigger: item,
          start: "-10% 85%",
        },
      });
    });
  });
})();

/* =========================================================
   홈 화면 흐르는 강점 배너(.trust-marquee)
   - index.html에 적어둔 문구 한 벌(.trust-marquee-group)을 화면 폭보다 길어질
     때까지 복제해서 이어 붙이고, 끝과 처음이 끊김 없이 이어지도록 애니메이션을
     시작합니다. 문구를 바꿀 때는 index.html의 첫 번째 그룹만 고치면 됩니다.
   - 흐르는 속도는 아래 PX_PER_SEC 값(1초에 이동하는 픽셀)으로 조절하세요.
   ========================================================= */
(function () {
  var PX_PER_SEC = 70;

  function build() {
    var marquee = document.querySelector(".trust-marquee");
    if (!marquee) return;
    var track = marquee.querySelector(".trust-marquee-track");
    var group = track && track.querySelector(".trust-marquee-group:not([data-clone])");
    if (!group) return;

    var oldClones = track.querySelectorAll(".trust-marquee-group[data-clone]");
    for (var k = 0; k < oldClones.length; k++) oldClones[k].remove();

    var groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth) return;

    var screenW = Math.max(window.innerWidth, (window.screen && window.screen.width) || 0);
    var perHalf = Math.ceil(screenW / groupWidth) + 1;

    for (var i = 1; i < perHalf * 2; i++) {
      var copy = group.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.setAttribute("data-clone", "");
      track.appendChild(copy);
    }

    track.style.setProperty("--marquee-duration", (groupWidth * perHalf) / PX_PER_SEC + "s");
    marquee.classList.add("is-running");
  }

  function start() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build);
    } else {
      build();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 250);
  });
})();

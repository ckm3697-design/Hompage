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

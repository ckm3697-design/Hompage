
/* properties-N1 */
(function() {
  $(function() {
    $(".properties-N1[id=\'xPMt87xyYD\']").each(function() {
      const $block = $(this);
      let isMobileMenuInitialized = false;
      let isDesktopMenuInitialized = false;
      // 모바일 메뉴 초기화
      function initMobileMenu() {
        if (isMobileMenuInitialized) return;
        const $btnMomenu = $block.find(".btn-momenu");
        $btnMomenu.off("click").on("click", function() {
          if ($block.hasClass("block-active")) {
            $block.removeClass("block-active");
          } else {
            $block.addClass("block-active");
          }
          $block.find(".header-gnbitem").removeClass("item-active");
          $block.find(".header-sublist").removeAttr("style");
        });
        // header-gnbitem 클릭 이벤트
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          const $sublist = $this.find(".header-sublist");
          if ($sublist.length) {
            $thisLink.off("click").on("click", function(event) {
              event.preventDefault();
              const $clickedItem = $(this).parents(".header-gnbitem");
              if (!$clickedItem.hasClass("item-active")) {
                $block.find(".header-gnbitem").removeClass("item-active");
                $block.find(".header-sublist").stop().slideUp(300);
              }
              $clickedItem.toggleClass("item-active");
              $sublist.stop().slideToggle(300);
            });
          }
        });
        isMobileMenuInitialized = true;
      }
      // 데스크탑 메뉴 초기화
      function initDesktopMenu() {
        if (isDesktopMenuInitialized) return;
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          $thisLink.off("click");
        });
        isDesktopMenuInitialized = true;
      }
      // 해상도에 따른 메뉴 처리
      function handleResize() {
        if (window.innerWidth <= 992) {
          if (!isMobileMenuInitialized) {
            initMobileMenu();
          }
          isDesktopMenuInitialized = false;
        } else {
          if (!isDesktopMenuInitialized) {
            initDesktopMenu();
          }
          isMobileMenuInitialized = false;
        }
      }
      // 스크롤 시 메뉴 처리
      function handleScroll() {
        const $headerTop = $block.find(".header-top");
        if ($headerTop.length) {
          $block.addClass("top-menu-active");
        }
        if ($(window).scrollTop() === 0) {
          $block.addClass("header-top-active");
        }
        $(window).scroll(function() {
          if ($(window).scrollTop() > 0) {
            $block.removeClass("header-top-active");
          } else {
            $block.addClass("header-top-active");
          }
        });
      }
      handleScroll();
      // 전체 메뉴 열기/닫기 처리
      function handleFullMenu() {
        $block.find(".btn-allmenu").on("click", function() {
          $block.find(".header-fullmenu").addClass("fullmenu-active");
        });
        $block.find(".fullmenu-close").on("click", function() {
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
        });
        $block.find(".fullmenu-gnbitem").each(function() {
          const $this = $(this);
          $this.on("mouseover", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").addClass("on");
            }
          });
          $this.on("mouseout", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").removeClass("on");
            }
          });
        });
      }
      handleFullMenu();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();

/* properties-N4 */
(function() {
  $(function() {
    $(".properties-N4[id=\'hero-section\']").each(function() {
      const $block = $(this);
      // Swiper
      const swiper = new Swiper(".properties-N4[id=\'hero-section\'] .swiper", {
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      // 정지
      $block.find(".btn-pause").click(function() {
        swiper.autoplay.stop();
        $(this).removeClass("active");
        $(this).siblings().addClass("active");
      });
      // 재생
      $block.find(".btn-play").click(function() {
        swiper.autoplay.start();
        $(this).removeClass("active");
        $(this).siblings().addClass("active");
      });
    });
  });
})();

/* properties-N5 */
(function() {
  $(function() {
    $(".properties-N5[id=\'about-section\']").each(function() {
      const $block = $(this);
      const $items = $block.find(".item");
      $items.each(function(_, item) {
        const $item = $(item);
        const $title = $item.find(".title strong");
        const $desc = $item.find(".desc");
        // ease
        gsap.defaults({
          ease: "power2.inOut"
        });
        // 타임라인 생성
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "-20% 70%",
            end: "100% 80%",
          }
        });
        // 각 요소별 애니메이션
        tl.from(item, {
            y: 100,
            opacity: 0,
            duration: 1,
          })
          .from($title, {
            y: 40,
            opacity: 0,
            duration: 0.8
          }, "-=0.5")
          .from($desc, {
            y: 40,
            opacity: 0,
            duration: 0.8
          }, "-=0.4");
      });
    });
  });
})();

/* properties-N7 */
(function() {
  $(function() {
    $(".properties-N7[id=\'product-section\']").each(function() {
      const $block = $(this);
      // .tabset-link를 클릭했을 때 이벤트 핸들러 실행
      $block.find(".tabset-link").click(function() {
        const $idx = $(this).parent().index();
        $block
          .find(".info .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $block
          .find(".thumb .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    });
  });
})();

/* properties-N9 */
(function() {
  $(function() {
    $(".properties-N9[id=\'contact-section\']").each(function() {
      const $block = $(this);
      const $checksetWrap = $block.find(".checkset-wrap");
      // 체크박스 그룹 유효성 체크 input 추가
      if ($checksetWrap.length) {
        const $validator = $('<input>', {
          type: 'text',
          required: true,
          style: 'position: absolute; opacity: 0; pointer-events: none;',
          tabindex: -1
        }).insertBefore($checksetWrap.find('.checkset-input').first());
        const $groupChecks = $checksetWrap.find('.checkset-input');
        // 기존 체크박스의 required 속성 제거
        $groupChecks.prop('required', false);
        // 체크박스 상태 변경 이벤트
        $groupChecks.on('change', function() {
          if ($groupChecks.is(':checked')) {
            $validator.val('checked');
            $validator[0].setCustomValidity('');
          } else {
            $validator.val('');
            $validator[0].setCustomValidity('목적을 최소 하나 이상 선택해주세요.');
          }
        });
        // 초기 상태 설정
        $validator.val('');
        $validator[0].setCustomValidity('목적을 최소 하나 이상 선택해주세요.');
      }
    });
  });
})();

/* ===================================================================
 * Nexora - Main JS (Optimized)
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  /* Animations
   * -------------------------------------------------- */
  const tl = anime.timeline({
    easing: "easeInOutCubic",
    duration: 700,
    autoplay: false,
  });

  tl.add({
    targets: "#loader",
    opacity: 0,
    duration: 600,
    begin: function () {
      window.scrollTo(0, 0);
    },
  })
    .add({
      targets: "#preloader",
      opacity: 0,
      duration: 400,
      complete: function () {
        const preloader = document.querySelector("#preloader");
        if (preloader) {
          preloader.style.visibility = "hidden";
          preloader.style.display = "none";
        }
      },
    })
    .add(
      {
        targets: ".s-header",
        translateY: [-60, 0],
        opacity: [0, 1],
        duration: 600,
      },
      "-=150",
    )
    .add({
      targets: [".s-intro .text-pretitle", ".s-intro .text-huge-title"],
      translateX: [60, 0],
      opacity: [0, 1],
      delay: anime.stagger(250),
      duration: 700,
    })
    .add({
      targets: ".circles span",
      opacity: [0, 0.25],
      delay: anime.stagger(60, { direction: "reverse" }),
      duration: 500,
    })
    .add({
      targets: ".intro-social li",
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(80),
      duration: 600,
    })
    .add(
      {
        targets: ".intro-scrolldown",
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 600,
      },
      "-=500",
    );

  /* Preloader (FAST START FIX)
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    // ⚡ Use DOMContentLoaded instead of full load
    window.addEventListener("DOMContentLoaded", function () {
      document.documentElement.classList.remove("ss-preload");
      document.documentElement.classList.add("ss-loaded");

      document.querySelectorAll(".ss-animated").forEach(function (item) {
        item.classList.remove("ss-animated");
      });

      // small delay so transition feels smooth, not instant pop
      setTimeout(() => {
        tl.play();
      }, 120);
    });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const mainNavWrap = document.querySelector(".main-nav-wrap");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    mainNavWrap.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 801px)").matches) {
        siteBody.classList.remove("menu-is-open");
        toggleButton.classList.remove("is-clicked");
      }
    });
  };

  /* Scroll Spy
   * ------------------------------------------------------ */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll(".target-section");

    window.addEventListener("scroll", function () {
      let scrollY = window.pageYOffset;

      sections.forEach(function (current) {
        const height = current.offsetHeight;
        const top = current.offsetTop - 60;
        const id = current.getAttribute("id");

        const link = document.querySelector(".main-nav a[href*=" + id + "]");

        if (!link) return;

        if (scrollY > top && scrollY <= top + height) {
          link.parentNode.classList.add("current");
        } else {
          link.parentNode.classList.remove("current");
        }
      });
    });
  };

  /* View Animations
   * ------------------------------------------------------ */
  const ssViewAnimate = function () {
    const blocks = document.querySelectorAll("[data-animate-block]");

    window.addEventListener("scroll", function () {
      let scrollY = window.pageYOffset;

      blocks.forEach(function (current) {
        const vh = window.innerHeight;
        const trigger = current.offsetTop + vh * 0.15 - vh;
        const blockHeight = current.offsetHeight;
        const inView = scrollY > trigger && scrollY <= trigger + blockHeight;

        if (inView && !current.classList.contains("ss-animated")) {
          anime({
            targets: current.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [60, 0],
            delay: anime.stagger(200),
            duration: 700,
            easing: "easeOutCubic",
            begin: function () {
              current.classList.add("ss-animated");
            },
          });
        }
      });
    });
  };

  /* Swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    new Swiper(".swiper-container", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        401: { slidesPerView: 1, spaceBetween: 20 },
        801: { slidesPerView: 2, spaceBetween: 25 },
        1201: { slidesPerView: 2, spaceBetween: 60 },
      },
    });
  };

  /* Lightbox
   * ------------------------------------------------------ */
  const ssLightbox = function () {
    const links = document.querySelectorAll(".folio-list__item-link");
    const modals = [];

    links.forEach(function (link) {
      let modal = link.getAttribute("href");

      let instance = basicLightbox.create(document.querySelector(modal), {
        onShow: function (instance) {
          document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") instance.close();
          });
        },
      });

      modals.push(instance);
    });

    links.forEach(function (link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        modals[i].show();
      });
    });
  };

  /* Alerts
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    document.querySelectorAll(".alert-box").forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 400);
        }
      });
    });
  };

  /* Smooth Scroll
   * ------------------------------------------------------ */
  const ssMoveTo = function () {
    const moveTo = new MoveTo(
      {
        tolerance: 0,
        duration: 900,
        easing: "easeInOutCubic",
        container: window,
      },
      {},
    );

    document.querySelectorAll(".smoothscroll").forEach(function (el) {
      moveTo.registerTrigger(el);
    });
  };

  /* INIT
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
    ssScrollSpy();
    ssViewAnimate();
    ssSwiper();
    ssLightbox();
    ssAlertBoxes();
    ssMoveTo();
  })();
})(document.documentElement);

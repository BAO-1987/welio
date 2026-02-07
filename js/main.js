// Main site behavior (moved from inline scripts)

// Progress bar for Journey section
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.querySelector(".progress-container");
    const progressWrapHeight = 1355; // Known fixed height of .progress-wrap
    const viewportHeight = window.innerHeight;

    if (!progressBar || !progressContainer) return;

    const updateProgressBar = () => {
      const progressContainerRect = progressContainer.getBoundingClientRect();
      const halfwayPoint = viewportHeight / 2;
      if (progressContainerRect.top > halfwayPoint) {
        progressBar.style.height = "0px";
        progressBar.style.top = "0px";
      } else if (progressContainerRect.bottom < halfwayPoint) {
        progressBar.style.height = progressWrapHeight + "px";
        progressBar.style.top = "0px";
      } else {
        const visibleHeight = Math.min(
          Math.max(0, halfwayPoint - progressContainerRect.top),
          progressWrapHeight,
        );
        progressBar.style.height = visibleHeight + "px";
        progressBar.style.top = "0px";
      }
    };

    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);
    updateProgressBar();
  });
})();

// NAD+ Age Calculator
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const ageSlider = document.getElementById("ageSlider");
    const ageValue = document.getElementById("ageValue");
    const nadLevel = document.getElementById("nadLevel");
    const nadMessage = document.getElementById("nadMessage");

    if (!ageSlider || !ageValue || !nadLevel || !nadMessage) {
      return;
    }

    function calculateNAD(age) {
      if (age <= 20) return 100;
      if (age >= 70) return 25;
      return Math.round(100 - (age - 20) * 1.5);
    }

    function getNADMessage(age, level) {
      if (age < 40) {
        return (
          "At " +
          age +
          ", your NAD+ is still at " +
          level +
          "%. Start protecting it now with WELIO."
        );
      } else if (age < 50) {
        return (
          "At " +
          age +
          ", your NAD+ has dropped to " +
          level +
          "%. WELIO can help restore cellular energy."
        );
      } else if (age < 60) {
        return (
          "At " +
          age +
          ", your NAD+ is at just " +
          level +
          "% of youthful levels. WELIO restores what time takes away."
        );
      }
      return (
        "At " +
        age +
        ", your NAD+ is critically low at " +
        level +
        "%. WELIO can help revitalize your cells."
      );
    }

    function updateSliderBackground(slider, value) {
      const min = parseInt(slider.min, 10);
      const max = parseInt(slider.max, 10);
      const percent = ((value - min) / (max - min)) * 100;
      slider.style.background =
        "linear-gradient(to right, #0D6B4B 0%, #0D6B4B " +
        percent +
        "%, #E4DCD8 " +
        percent +
        "%, #E4DCD8 100%)";
    }

    function updateNADDisplay(age) {
      const level = calculateNAD(age);
      ageValue.textContent = age;
      nadLevel.textContent = level;
      nadMessage.textContent = getNADMessage(age, level);

      if (level >= 70) {
        nadLevel.style.color = "#0D6B4B";
      } else if (level >= 50) {
        nadLevel.style.color = "#C6A673";
      } else {
        nadLevel.style.color = "#C44536";
      }

      updateSliderBackground(ageSlider, age);
    }

    updateNADDisplay(50);

    ageSlider.addEventListener("input", function () {
      updateNADDisplay(parseInt(this.value, 10));
    });
  });
})();

// Symptom Checklist Interaction
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const symptomItems = document.querySelectorAll(".symptom-item");
    const symptomResult = document.getElementById("symptom-result");
    const symptomCount = document.getElementById("symptom-count");

    symptomItems.forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("checked");
        const checkedCount = document.querySelectorAll(
          ".symptom-item.checked",
        ).length;
        if (symptomCount) {
          symptomCount.textContent = checkedCount;
        }
        if (symptomResult) {
          symptomResult.style.display = checkedCount >= 2 ? "block" : "none";
        }
      });
    });
  });
})();

// Slideout menu shadow + open/close
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const slideoutMenu = document.querySelector(".slideout-menu");
    const menuHeader = document.querySelector(".menu-header");
    const menuToggles = document.querySelectorAll(".navbar-wrapper");
    const blackout = document.querySelector(".blackout");

    if (slideoutMenu && menuHeader) {
      slideoutMenu.addEventListener("scroll", function () {
        if (slideoutMenu.scrollTop > 0) {
          menuHeader.classList.add("has-shadow");
        } else {
          menuHeader.classList.remove("has-shadow");
        }
      });
    }

    const openMenu = (e) => {
      if (e) e.preventDefault();
      if (!slideoutMenu || !blackout) return;
      slideoutMenu.classList.add("open");
      blackout.classList.add("open");
    };

    const closeMenu = (e) => {
      if (e && e.preventDefault && e.type !== "click-link") e.preventDefault();
      if (!slideoutMenu || !blackout) return;
      slideoutMenu.classList.remove("open");
      blackout.classList.remove("open");
    };

    if (menuToggles && menuToggles.length) {
      menuToggles.forEach((btn) => btn.addEventListener("click", openMenu));
    }
    if (menuHeader) {
      menuHeader.addEventListener("click", closeMenu);
    }
    if (blackout) {
      blackout.addEventListener("click", closeMenu);
    }

    const menuLinks = document.querySelectorAll(".slideout-menu a");
    if (menuLinks.length) {
      menuLinks.forEach((link) =>
        link.addEventListener("click", function () {
          closeMenu({ type: "click-link" });
        }),
      );
    }
  });
})();

// Sticky header
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-inner");
    if (!header) return;

    const headerOffset = header.offsetTop;

    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition > headerOffset) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  });
})();

// Swiper initializations
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper === "undefined") return;

    // Results Swiper
    new Swiper(".results-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      speed: 800,
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3 },
      },
    });

    // Logo Swiper
    new Swiper(".logo-swiper", {
      slidesPerView: 3,
      spaceBetween: 40,
      loop: true,
      speed: 3000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      breakpoints: {
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      },
    });

    // Doctors Swiper
    new Swiper(".doctors-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });
})();

// Affiliate tracking (EF)
(function () {
  if (window.EF && typeof window.EF.configure === "function") {
    window.EF.configure({
      organic: {
        offer_id: 5,
        affiliate_id: 6,
      },
    });
    window.EF.click({
      tracking_domain: "https://www.mnbvpo8trk.com",
      offer_id: window.EF.urlParameter("oid"),
      affiliate_id: window.EF.urlParameter("affid"),
      sub1: window.EF.urlParameter("sub1"),
      sub2: window.EF.urlParameter("sub2"),
      sub3: window.EF.urlParameter("sub3"),
      sub4: window.EF.urlParameter("sub4"),
      sub5: window.EF.urlParameter("sub5"),
      uid: window.EF.urlParameter("uid"),
      source_id: window.EF.urlParameter("source_id"),
      transaction_id: window.EF.urlParameter("_ef_transaction_id"),
    });
  }
})();

// Axon tracking
(function () {
  var AXON_EVENT_KEY = "ac921be1-95f5-4d1f-aefb-78b60145346c";
  (function (e, r) {
    var t = [
      "https://s.axon.ai/pixel.js",
      "https://res4.applovin.com/p/l/loader.iife.js",
    ];
    if (!e.axon) {
      var a = (e.axon = function () {
        a.performOperation
          ? a.performOperation.apply(a, arguments)
          : a.operationQueue.push(arguments);
      });
      a.operationQueue = [];
      a.ts = Date.now();
      a.eventKey = AXON_EVENT_KEY;
      for (
        var n = r.getElementsByTagName("script")[0], o = 0;
        o < t.length;
        o++
      ) {
        var i = r.createElement("script");
        i.async = true;
        i.src = t[o];
        n.parentNode.insertBefore(i, n);
      }
    }
  })(window, document);

  if (window.axon) {
    window.axon("init");
    window.axon("track", "page_view");
  }
})();

// Cookie Consent Management
//
// Для корректной работы с Яндекс.Метрикой:
// 1. Добавьте код Яндекс.Метрики в HTML как обычно
// 2. Система автоматически отключит метрику при отклонении cookies
// 3. При принятии cookies метрика будет включена
//
// Пример интеграции:
// <script>
//   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
//   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
//   (window, document, "script", "https://mc.yandex.ru/metrika/watch.js", "ym");
//
//   ym(XXXXXX, "init", {
//     clickmap:true,
//     trackLinks:true,
//     accurateTrackBounce:true
//   });
// </script>

class CookieConsent {
  constructor() {
    this.cookieName = "cookie_consent";
    this.cookieExpiry = 365; // days
    this.init();
  }

  init() {
    // Check if user has already made a choice
    if (!this.hasConsent()) {
      this.showBanner();
    } else {
      // Если пользователь уже сделал выбор, применяем его
      const consentStatus = this.getConsentStatus();
      if (consentStatus === "accepted") {
        this.enableTargetingCookies();
      } else if (consentStatus === "declined") {
        this.disableTargetingCookies();
      }
    }

    // Bind event listeners
    this.bindEvents();
  }

  bindEvents() {
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => this.acceptCookies());
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", () => this.declineCookies());
    }
  }

  showBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        banner.classList.add("show");
      }, 500);
    }
  }

  hideBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) {
      banner.classList.remove("show");
    }
  }

  acceptCookies() {
    this.setCookie(this.cookieName, "accepted", this.cookieExpiry);
    this.hideBanner();
    this.enableTargetingCookies();
    console.log("Cookies accepted - targeting cookies enabled");
  }

  declineCookies() {
    this.setCookie(this.cookieName, "declined", this.cookieExpiry);
    this.hideBanner();
    this.disableTargetingCookies();
    console.log("Cookies declined - targeting cookies disabled");
  }

  enableTargetingCookies() {
    // Enable Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }

    // Enable Yandex Metrica
    this.enableYandexMetrica();

    // Enable Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("consent", "grant");
    }

    // Set a flag for other scripts to check
    window.targetingCookiesEnabled = true;

    console.log("Targeting cookies enabled - analytics tracking active");
  }

  disableTargetingCookies() {
    // Disable Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }

    // Disable Yandex Metrica
    this.disableYandexMetrica();

    // Disable Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("consent", "revoke");
    }

    // Remove existing targeting cookies
    this.removeTargetingCookies();

    // Set a flag for other scripts to check
    window.targetingCookiesEnabled = false;

    console.log("Targeting cookies disabled - analytics tracking stopped");
  }

  removeTargetingCookies() {
    // List of common targeting cookie names to remove
    const targetingCookies = [
      // Google Analytics
      "_ga",
      "_gid",
      "_gat",
      "_gtag_GA_",
      // Facebook
      "_fbp",
      "_fbc",
      "fr",
      "tr",
      // Yandex Metrica
      "_ym_uid",
      "_ym_d",
      "_ym_isad",
      "_ym_visorc",
      "yandexuid",
      "yuidss",
      "ymex",
      "yabs-sid",
      // Other common tracking cookies
      "anj",
      "uuid2",
      "sess",
      "icu",
    ];

    targetingCookies.forEach((cookieName) => {
      this.deleteCookie(cookieName);
      this.deleteCookie(cookieName, "/");
      this.deleteCookie(cookieName, "/", window.location.hostname);
      this.deleteCookie(cookieName, "/", "." + window.location.hostname);
    });
  }

  hasConsent() {
    const consent = this.getCookie(this.cookieName);
    return consent === "accepted" || consent === "declined";
  }

  getConsentStatus() {
    return this.getCookie(this.cookieName);
  }

  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name, path = "/", domain = "") {
    const domainStr = domain ? `;domain=${domain}` : "";
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}${domainStr}`;
  }

  // Method to reset consent (for testing purposes)
  resetConsent() {
    this.deleteCookie(this.cookieName);
    this.showBanner();
  }

  // Yandex Metrica specific methods
  enableYandexMetrica() {
    // Включаем Яндекс.Метрику если она есть
    if (typeof ym !== "undefined") {
      // Находим все счетчики Яндекс.Метрики
      Object.keys(window).forEach((key) => {
        if (key.startsWith("yaCounter") && window[key]) {
          try {
            // Включаем отправку данных
            window[key].userParams({ cookiesEnabled: true });
            // Возобновляем отправку хитов если счетчик был приостановлен
            if (window[key].reachGoal) {
              window[key].reachGoal("COOKIES_ACCEPTED");
            }
          } catch (e) {
            console.log("Yandex Metrica enable failed:", e);
          }
        }
      });
    }

    // Убираем флаг отключения метрики
    window.yandexMetricaDisabled = false;
  }

  disableYandexMetrica() {
    // Отключаем Яндекс.Метрику
    if (typeof ym !== "undefined") {
      // Находим все счетчики Яндекс.Метрики и отключаем их
      Object.keys(window).forEach((key) => {
        if (key.startsWith("yaCounter") && window[key]) {
          try {
            // Отключаем отправку данных
            window[key].userParams({ cookiesEnabled: false });

            // Отправляем последнее событие об отказе от cookies
            if (window[key].reachGoal) {
              window[key].reachGoal("COOKIES_DECLINED");
            }

            // Полностью останавливаем счетчик
            if (window[key].destroy) {
              window[key].destroy();
            }
          } catch (e) {
            console.log("Yandex Metrica disable failed:", e);
          }
        }
      });
    }

    // Устанавливаем флаг отключения метрики для предотвращения загрузки новых счетчиков
    window.yandexMetricaDisabled = true;

    // Блокируем функцию ym если она существует
    if (typeof window.ym === "function") {
      window.ym = function () {
        console.log("Yandex Metrica blocked due to cookie consent");
      };
    }
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.cookieConsent = new CookieConsent();
});

// Make it available globally for debugging
window.CookieConsent = CookieConsent;

/* async function getPartners() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/partners"
    );
    const data = await response.json();

    const partnersList = document.querySelector(".partners__list");
    if (!partnersList) return;

    partnersList.innerHTML = "";

    data.partners.forEach((partner) => {
      const partnerItem = document.createElement("a");
      partnerItem.className = "partners__item";
      partnerItem.href = partner.link ?? "#";
      partnerItem.target = "_blank";

      const partnerLogo = document.createElement("img");
      partnerLogo.src = "https://api.posmotri.by/storage/" + partner.logo_path;
      partnerLogo.alt = partner.name;
      partnerLogo.loading = "lazy";

      partnerItem.appendChild(partnerLogo);
      partnersList.appendChild(partnerItem);
    });
  } catch (error) {
    console.error("Ошибка при загрузке партнеров:", error);
  }
}

async function getSpeakers() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/speakers"
    );
    const data = await response.json();

    const speakersList = document.querySelector(".speakers__list");
    if (!speakersList) return;

    speakersList.innerHTML = "";

    data.speakers.forEach((speaker) => {
      const speakerItem = document.createElement("div");
      speakerItem.className = "speakers__item";

      // Добавляем значок online если спикер онлайн
      if (speaker.is_online) {
        const onlineImg = document.createElement("img");
        onlineImg.className = "online";
        onlineImg.src = "./assets/images/online.png";
        onlineImg.alt = "";
        speakerItem.appendChild(onlineImg);
      }

      // Добавляем фото спикера
      const speakerImg = document.createElement("img");
      speakerImg.src = "https://api.posmotri.by/storage/" + speaker.photo_path;
      speakerImg.alt = speaker.name;
      speakerImg.className = "speakers__item-img";
      speakerItem.appendChild(speakerImg);

      // Создаем блок информации о спикере
      const infoDiv = document.createElement("div");
      infoDiv.className = "speakers__item-info";

      const captionDiv = document.createElement("div");
      captionDiv.className = "speakers__item-caption";

      const positionP = document.createElement("p");
      positionP.className = "speakers__item-tag";
      positionP.textContent = speaker.position;

      const nameP = document.createElement("p");
      nameP.className = "speakers__item-name";
      nameP.textContent = speaker.name;

      // Добавляем описание
      const descP = document.createElement("p");
      descP.className = "speakers__item-text";
      descP.innerHTML = speaker.description.replace(/—/g, "<br>—");

      captionDiv.appendChild(positionP);
      captionDiv.appendChild(nameP);
      captionDiv.appendChild(descP);

      infoDiv.appendChild(captionDiv);

      // Добавляем социальные сети только если они есть
      const hasSocialLinks =
        speaker.instagram_link || speaker.telegram_link || speaker.website_link;

      if (hasSocialLinks) {
        const socialsDiv = document.createElement("div");
        socialsDiv.className = "speakers__item-social";

        if (speaker.instagram_link) {
          const instaLink = document.createElement("a");
          instaLink.href = speaker.instagram_link;
          instaLink.target = "_blank";
          instaLink.className = "speakers__item-social-link instagram";

          const instaImg = document.createElement("img");
          instaImg.src = "./assets/images/inst.svg";
          instaImg.alt = "Instagram";
          instaLink.appendChild(instaImg);

          socialsDiv.appendChild(instaLink);
        }

        if (speaker.telegram_link) {
          const telegramLink = document.createElement("a");
          telegramLink.href = speaker.telegram_link;
          telegramLink.target = "_blank";
          telegramLink.className = "speakers__item-social-link telegram";

          const tgImg = document.createElement("img");
          tgImg.src = "./assets/images/tg.svg";
          tgImg.alt = "Telegram";
          telegramLink.appendChild(tgImg);

          socialsDiv.appendChild(telegramLink);
        }

        if (speaker.website_link) {
          const websiteLink = document.createElement("a");
          websiteLink.href = speaker.website_link;
          websiteLink.target = "_blank";
          websiteLink.className = "speakers__item-social-link website";

          const siteImg = document.createElement("img");
          siteImg.src = "./assets/images/site.svg";
          siteImg.alt = "Website";
          websiteLink.appendChild(siteImg);

          socialsDiv.appendChild(websiteLink);
        }

        infoDiv.appendChild(socialsDiv);
      }

      speakerItem.appendChild(infoDiv);
      speakersList.appendChild(speakerItem);
    });
  } catch (error) {
    console.error("Ошибка при загрузке спикеров:", error);
  }
}

async function getEvents() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/events"
    );
    const data = await response.json();

    const eventsList = document.querySelector(".expectations__list");
    if (!eventsList) return;

    eventsList.innerHTML = "";

    data.events.forEach((event) => {
      const eventItem = document.createElement("div");
      eventItem.className = "expectations__item";

      const eventCaption = document.createElement("div");
      eventCaption.className = "expectations__item-caption";

      // Создаем изображение
      const eventIcon = document.createElement("img");
      eventIcon.src = "https://api.posmotri.by/storage/" + event.icon_path;
      eventIcon.alt = event.title;
      eventIcon.className = "expectations__item-img";

      // Создаем заголовок
      const eventTitle = document.createElement("p");
      eventTitle.className = "expectations__item-title";
      eventTitle.textContent = event.title;

      // Создаем описание
      const eventContent = document.createElement("p");
      eventContent.className = "expectations__item-text";
      eventContent.textContent = event.content;

      // Добавляем все элементы в карточку
      eventCaption.appendChild(eventIcon);
      eventCaption.appendChild(eventTitle);

      eventItem.appendChild(eventCaption);
      eventItem.appendChild(eventContent);

      eventsList.appendChild(eventItem);
    });
  } catch (error) {
    console.error("Ошибка при загрузке событий:", error);
  }
}

async function getTariffs() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/tariffs"
    );
    const data = await response.json();

    const tariffsList = document.querySelector(".tariffs__list");
    if (!tariffsList) return;

    tariffsList.innerHTML = "";

    data.tariffs.forEach((tariff, index, array) => {
      const tariffItem = document.createElement("div");
      tariffItem.className = "tariffs__item";

      const titleDiv = document.createElement("div");
      titleDiv.className = "tariffs__item-title";
      titleDiv.textContent = tariff.name;

      // Если это последний тариф, добавляем значок сертификата
      if (index === array.length - 1) {
        const badge = document.createElement("img");
        badge.className = "tariffs__item-badge";
        badge.src = "./assets/images/certified.svg";
        badge.alt = "";
        tariffItem.appendChild(badge);
      }

      // Создаем список особенностей тарифа
      const featuresList = document.createElement("ul");
      featuresList.className = "tariffs__item-list";

      // Сортируем особенности: сначала активные, потом неактивные
      const sortedFeatures = [...tariff.features].sort((a, b) => {
        const aEnabled = a.pivot.is_enabled === "1";
        const bEnabled = b.pivot.is_enabled === "1";
        if (aEnabled && !bEnabled) return -1;
        if (!aEnabled && bEnabled) return 1;
        return 0;
      });

      sortedFeatures.forEach((feature) => {
        const featureItem = document.createElement("li");
        featureItem.className = `tariffs__item-list-item${
          feature.pivot.is_enabled === "1" ? " active" : ""
        }`;

        // Добавляем SVG иконку
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "32");
        svg.setAttribute("height", "33");
        svg.setAttribute("viewBox", "0 0 32 33");
        svg.setAttribute("fill", "none");

        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("clip-rule", "evenodd");
        path.setAttribute(
          "d",
          "M12.745 5.42943C14.3403 3.19605 17.6596 3.19605 19.2549 5.42943L19.5089 5.78499C19.7896 6.17806 20.2611 6.38853 20.7411 6.33519L21.8731 6.20941C24.4208 5.92634 26.5735 8.07902 26.2904 10.6267L26.1647 11.7587C26.1113 12.2388 26.3217 12.7102 26.7148 12.9909L27.0704 13.2449C29.3037 14.8401 29.3037 18.1594 27.0704 19.7548L26.7148 20.0088C26.3217 20.2894 26.1113 20.7609 26.1647 21.2409L26.2904 22.3729C26.5735 24.9206 24.4208 27.0733 21.8731 26.7902L20.7411 26.6645C20.2611 26.6112 19.7896 26.8216 19.5089 27.2146L19.2549 27.5702C17.6596 29.8036 14.3404 29.8036 12.745 27.5702L12.4911 27.2146C12.2103 26.8216 11.7389 26.6112 11.2588 26.6645L10.1268 26.7902C7.57917 27.0733 5.42649 24.9206 5.70956 22.3729L5.83535 21.2409C5.88868 20.7609 5.67821 20.2894 5.28515 20.0088L4.92959 19.7548C2.6962 18.1594 2.6962 14.8402 4.92959 13.2449L5.28515 12.9909C5.67821 12.7102 5.88868 12.2388 5.83535 11.7587L5.70956 10.6267C5.42649 8.07902 7.57917 5.92634 10.1268 6.20941L11.2589 6.33519C11.7389 6.38853 12.2103 6.17806 12.4911 5.78499L12.745 5.42943ZM20.9428 12.8904C21.4635 13.4111 21.4635 14.2553 20.9428 14.776L15.8509 19.8678C15.1969 20.522 14.1364 20.522 13.4824 19.8678L11.0572 17.4426C10.5365 16.922 10.5365 16.0777 11.0572 15.557C11.5779 15.0364 12.4221 15.0364 12.9428 15.557L14.6667 17.2809L19.0572 12.8904C19.5779 12.3697 20.4221 12.3697 20.9428 12.8904Z"
        );
        path.setAttribute("fill", "#6747E5");

        svg.appendChild(path);

        // Добавляем текст особенности
        const featureText = document.createElement("p");
        featureText.className = "tariffs__item-list-item-text";
        featureText.textContent = feature.name;

        featureItem.appendChild(svg);
        featureItem.appendChild(featureText);
        featuresList.appendChild(featureItem);
      });

      // Создаем блок с информацией о цене и местах
      const infoDiv = document.createElement("div");
      infoDiv.className = "tariffs__item-info";

      const priceDiv = document.createElement("div");
      priceDiv.className = "tariffs__item-price";
      priceDiv.textContent = `${parseInt(tariff.discounted_price)} BYN`;

      const regularPrice = document.createElement("span");
      regularPrice.textContent = `${parseInt(tariff.regular_price)} BYN`;
      priceDiv.appendChild(regularPrice);

      const placesDiv = document.createElement("div");
      placesDiv.className = "tariffs__item-places";
      placesDiv.textContent = `Мест: ${tariff.available_seats}`;

      infoDiv.appendChild(priceDiv);
      infoDiv.appendChild(placesDiv);

      // Создаем кнопку покупки
      const buyButton = document.createElement("a");
      buyButton.href = tariff.payment_link;
      buyButton.className = "tariffs__item-button button";
      buyButton.textContent = "Купить билет";
      buyButton.target = "_blank";

      // Добавляем декоративные SVG для desktop и mobile
      const desktopSvg = document.createElement("div");
      desktopSvg.innerHTML = `<svg class="tariffs__item-img desktop" width="421" height="832" viewBox="0 0 421 832" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M276.15 832H360.604C393.96 832 421 800.801 421 762.321L421 76.6771C421.001 38.1969 393.962 7 360.606 7L275.588 7C271.183 42.3799 244.881 69.6065 212.997 69.6065C181.112 69.6065 154.807 42.3799 150.414 7L65.3846 7C32.0396 7 5 38.1969 5 76.6771L5 762.32C5 800.8 32.0396 831.998 65.3846 831.998L149.851 831.998C192.5 831.998 174.053 831.998 208 831.998C241.945 832 208.5 831.998 276.15 832ZM43.1043 202.801V178.829H97.2925V202.801H43.1043ZM138.307 202.801V178.829L192.494 178.829V202.801L138.307 202.801ZM233.507 202.801V178.829H287.707V202.801H233.507ZM328.707 202.801L328.707 178.829L382.896 178.829L382.896 202.801L328.707 202.801Z" fill="#F1F33F"/>
        <path d="M271.15 825H355.604C388.96 825 416 793.801 416 755.321L416 69.6771C416.001 31.1969 388.962 0 355.606 0L270.588 0C266.183 35.3799 239.881 62.6065 207.997 62.6065C176.112 62.6065 149.807 35.3799 145.414 0L60.3846 0C27.0396 0 0 31.1969 0 69.6771L0 755.32C0 793.8 27.0396 824.998 60.3846 824.998L144.851 824.998C187.5 824.998 169.053 824.998 203 824.998C236.945 825 203.5 824.998 271.15 825ZM38.1043 195.801V171.829H92.2925V195.801H38.1043ZM133.307 195.801V171.829L187.494 171.829V195.801L133.307 195.801ZM228.507 195.801V171.829H282.707V195.801H228.507ZM323.707 195.801L323.707 171.829L377.896 171.829L377.896 195.801L323.707 195.801Z" fill="#FAF9F6"/>
      </svg>`;

      const mobileSvg = document.createElement("div");
      mobileSvg.innerHTML = `<svg class="tariffs__item-img mobile" width="339" height="621" viewBox="0 0 339 621" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M222.354 621H290.364C317.225 621 339 597.743 339 569.058L339 57.9411C339.001 29.2559 317.226 6 290.365 6L221.901 6C218.354 32.3741 197.173 52.6703 171.497 52.6703C145.821 52.6703 124.638 32.3741 121.1 6L52.627 6C25.7747 6 4.00001 29.2559 4.00001 57.9411L4.00001 569.057C4.00001 597.742 25.7747 620.999 52.627 620.999H120.647C154.992 620.999 140.137 620.999 167.474 620.999C194.809 621 167.876 620.999 222.354 621ZM34.685 151.96V134.091H78.3221V151.96H34.685ZM111.351 151.96V134.091L154.987 134.091V151.96L111.351 151.96ZM188.014 151.96V134.091H231.66V151.96H188.014ZM264.678 151.96V134.091H308.315V151.96H264.678Z" fill="#F1F33F"/>
        <path d="M218.354 615H286.364C313.225 615 335 591.743 335 563.058L335 51.9411C335.001 23.2559 313.226 0 286.365 0L217.901 0C214.354 26.3741 193.173 46.6703 167.497 46.6703C141.821 46.6703 120.638 26.3741 117.1 0L48.627 0C21.7747 0 1.14441e-05 23.2559 1.14441e-05 51.9411L1.14441e-05 563.057C1.14441e-05 591.742 21.7747 614.999 48.627 614.999H116.647C150.992 614.999 136.137 614.999 163.474 614.999C190.809 615 163.876 614.999 218.354 615ZM30.685 145.96V128.091H74.3221V145.96H30.685ZM107.351 145.96V128.091L150.987 128.091V145.96L107.351 145.96ZM184.014 145.96V128.091H227.66V145.96H184.014ZM260.678 145.96V128.091H304.315V145.96H260.678Z" fill="#FAF9F6"/>
      </svg>`;

      // Добавляем все элементы в карточку тарифа
      tariffItem.appendChild(titleDiv);
      tariffItem.appendChild(featuresList);
      tariffItem.appendChild(infoDiv);
      tariffItem.appendChild(buyButton);
      tariffItem.appendChild(desktopSvg.firstElementChild);
      tariffItem.appendChild(mobileSvg.firstElementChild);

      tariffsList.appendChild(tariffItem);
    });
  } catch (error) {
    console.error("Ошибка при загрузке тарифов:", error);
  }
}

async function getVenue() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/venues"
    );
    const data = await response.json();

    const placeContainer = document.querySelector(".place__container");
    if (!placeContainer || !data.venues.length) return;

    const venue = data.venues[0];

    placeContainer.innerHTML = `
        <a href="${venue.map_link}" target="_blank" class="place__address">
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75.6107 30.9832C71.7607 14.0432 56.984 6.4165 44.004 6.4165C44.004 6.4165 44.004 6.4165 43.9674 6.4165C31.0239 6.4165 16.2106 14.0065 12.3606 30.9465C8.07059 49.8665 19.6573 65.8898 30.1439 75.9732C34.0306 79.7132 39.0174 81.5832 44.004 81.5832C48.9907 81.5832 53.9774 79.7132 57.8274 75.9732C68.314 65.8898 79.9007 49.9032 75.6107 30.9832ZM44.004 49.3532C37.624 49.3532 32.4539 44.1832 32.4539 37.8032C32.4539 31.4232 37.624 26.2532 44.004 26.2532C50.384 26.2532 55.554 31.4232 55.554 37.8032C55.554 44.1832 50.384 49.3532 44.004 49.3532Z" fill="#6747E5"/>
            </svg>
            <div class="place__caption">
                <div class="place__name">
                    ${venue.name}
                </div>
                <div class="place__location address">
                    ${venue.address}
                </div>
            </div>
        </a>
        <img src="https://api.posmotri.by${venue.photo_path}" alt="${venue.name}" class="place__picture">
    `;
  } catch (error) {
    console.error("Ошибка при загрузке информации о месте проведения:", error);
  }
}

async function getSchedule() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/schedule"
    );
    const data = await response.json();

    const programList = document.querySelector(".program__list");
    if (!programList) {
      console.error("Не найден элемент .program__list");
      return;
    }

    programList.innerHTML = "";

    if (!data.schedules || !data.schedules.length) {
      console.error("Нет данных о расписании");
      return;
    }

    data.schedules.forEach((item, index) => {
      const programItem = document.createElement("div");
      programItem.className = `program__item${
        item.is_headliner ? " headliner" : ""
      }`;

      // Создаем блок времени
      const timeBlock = document.createElement("div");
      timeBlock.className = "program__item-time";
      timeBlock.textContent = item.time_range;

      // Добавляем значок online если есть
      if (item.is_online) {
        const onlineImg = document.createElement("img");
        onlineImg.className = "online";
        onlineImg.src = "./assets/images/online.png";
        onlineImg.alt = "";
        timeBlock.appendChild(onlineImg);
      }

      // Создаем блок с описанием
      const captionBlock = document.createElement("div");
      captionBlock.className = "program__item-caption";

      if (item.speakers) {
        captionBlock.innerHTML = `
          <span>Тема:</span> ${item.description}
          <div class="program__item-speakers">
            Спикер${item.speakers.includes(",") ? "ы" : ""}: ${item.speakers}
          </div>
        `;

        if (item.is_headliner) {
          const headlineDiv = document.createElement("div");
          headlineDiv.className = "program__item-headline";
          headlineDiv.textContent = "Хедлайнер конференции";

          if (item.is_online) {
            const onlineImg = document.createElement("img");
            onlineImg.className = "online";
            onlineImg.src = "./assets/images/online.png";
            onlineImg.alt = "";
            headlineDiv.appendChild(onlineImg);
          }

          captionBlock.appendChild(headlineDiv);
        }
      } else {
        captionBlock.textContent = item.description;
      }

      programItem.appendChild(timeBlock);
      programItem.appendChild(captionBlock);

      // Добавляем фото если есть
      if (item.photo_path) {
        const photoImg = document.createElement("img");
        photoImg.src = "https://api.posmotri.by/" + item.photo_path;
        photoImg.alt = "";
        photoImg.className = "program__item-picture";
        programItem.appendChild(photoImg);
      }

      programList.appendChild(programItem);
    });
  } catch (error) {
    console.error("Ошибка при загрузке программы:", error);
  }
}

async function getGallery() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/gallery"
    );
    const data = await response.json();

    const galleryWrapper = document.querySelector(
      ".gallery__slider .swiper-wrapper"
    );
    if (!galleryWrapper) {
      console.error("Не найден элемент .gallery__slider .swiper-wrapper");
      return;
    }

    galleryWrapper.innerHTML = "";

    if (!data.images || !data.images.length) {
      console.error("Нет данных о галерее");
      return;
    }

    data.images.forEach((image) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = "https://api.posmotri.by" + image.image_path;
      img.alt = image.title || "Фотография галереи";
      img.loading = "lazy";

      slide.appendChild(img);
      galleryWrapper.appendChild(slide);
    });

    const galleryButtons = document.querySelectorAll(".button-arrow");

    const swiper = new Swiper(".gallery__slider", {
      slidesPerView: "auto",
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
      spaceBetween: 16,
      speed: 500,
      loop: true,
      slideToClickedSlide: true,
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("button-arrow")) {
        if (e.target.classList.contains("left")) {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      }
    });
  } catch (error) {
    console.error("Ошибка при загрузке галереи:", error);
  }
}

async function getMainScreen() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/main-screen"
    );
    const data = await response.json();

    // Обновляем подзаголовок
    const subtitle = document.querySelector(".hero__tag");
    if (subtitle) {
      subtitle.textContent = data.subtitle;
    }

    // Обновляем заголовок
    const title = document.querySelector(".hero__title");
    if (title) {
      title.innerHTML = data.title.replace("бренд", "<strong>бренд</strong>");
    }

    // Обновляем описание
    const description = document.querySelector(".hero__text");
    if (description) {
      description.textContent = data.description;
    }

    // Обновляем дату
    const dateElement = document.querySelector(".hero__date .date");
    if (dateElement) {
      dateElement.textContent = data.mainScreen.event_date.splice(0, 5);
    }
  } catch (error) {
    console.error("Ошибка при загрузке информации главного экрана:", error);
  }
}

getPartners();
getSpeakers();
getEvents();
getTariffs();
getVenue();
getSchedule();
getGallery();
getMainScreen();
 */

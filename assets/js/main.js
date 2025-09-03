const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu__close");
const burger = document.querySelector(".burger");
let address;
const speakers = document.querySelectorAll(".speakers__item");
const expectations = document.querySelectorAll(".expectations__item");
const programs = document.querySelectorAll(".program__item");
const whom = document.querySelectorAll(".who__item");
const feedback = document.querySelector(".feedback");

function handleScroll() {
  const windowHeight = window.innerHeight;
  const centerPosition = windowHeight / 2;

  const allElements = [...speakers, ...expectations, ...programs, ...whom];

  allElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;

    if (Math.abs(elementCenter - centerPosition) < rect.height / 2) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

document.addEventListener("click", (e) => {
  if (burger.contains(e.target)) {
    mobileMenu.classList.toggle("active");
  }

  if (mobileMenuClose.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }

  if (e.target.classList.contains("mobile-menu__list-item")) {
    mobileMenu.classList.remove("active");
  }

  if (e.target.classList.contains("mobile-menu__info-button")) {
    mobileMenu.classList.remove("active");
  }

  if (e.target.classList.contains("mobile-menu")) {
    mobileMenu.classList.remove("active");
  }

  if (e.target.classList.contains("popup")) {
    feedback.classList.add("active");
  }

  if (e.target.classList.contains("feedback__container")) {
    e.stopPropagation();
  }

  if (e.target.classList.contains("feedback")) {
    feedback.classList.remove("active");
  }

  if (e.target.classList.contains("mobile-menu__container")) {
    e.stopPropagation();
  }
});

function formatPhoneNumber(phone) {
  // Убираем все символы кроме цифр
  const cleaned = phone.replace(/[^\d]/g, "");

  // Проверяем длину и формат номера
  if (cleaned.length === 12 && cleaned.startsWith("375")) {
    return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(
      5,
      8
    )}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
  }

  // Если формат не соответствует, возвращаем исходный номер
  return phone;
}

async function getContacts() {
  try {
    const response = await fetch(
      "https://api.posmotri.by/api/v1/public/contacts"
    );
    const data = await response.json();

    if (!data.contact) {
      console.error("Нет данных о контактах");
      return;
    }

    const contact = data.contact;

    address = contact.address;

    // Обновляем все элементы с адресом
    document.querySelectorAll(".address").forEach((element) => {
      element.textContent = contact.address;
    });

    // Обновляем все элементы с телефоном
    document.querySelectorAll(".phone").forEach((element) => {
      const formattedPhone = formatPhoneNumber(contact.phone);
      element.textContent = formattedPhone;
      if (element.tagName.toLowerCase() === "a") {
        element.href = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
      }
    });

    // Обновляем все элементы с email
    document.querySelectorAll(".email").forEach((element) => {
      element.textContent = contact.email;
      if (element.tagName.toLowerCase() === "a") {
        element.href = `mailto:${contact.email}`;
      }
    });

    // Обновляем социальные сети
    const instagramLink = document.querySelector('a[href="instagram"]');
    if (instagramLink && contact.instagram) {
      instagramLink.href = `${contact.instagram}`;
      instagramLink.target = "_blank";
    }

    const telegramLink = document.querySelector('a[href="telegram"]');
    if (telegramLink && contact.telegram) {
      telegramLink.href = `${contact.telegram}`;
      telegramLink.target = "_blank";
    }

    // Инициализируем карту после получения адреса
    initMap();
  } catch (error) {
    console.error("Ошибка при загрузке контактов:", error);
  }
}
getContacts();

async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } =
    ymaps3;

  const { YMapDefaultMarker } = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1"
  );

  // Ждем, пока адрес будет получен
  while (!address) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Создаем URL для геокодирования
  const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&format=json&geocode=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    const coordinates =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(" ")
        .map(Number); // Теперь получаем [долгота, широта]

    fetch("/assets/maps.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(coordinates, address);
        const map = new YMap(
          document.getElementById("contacts__map"),
          {
            location: {
              center: coordinates,
              zoom: 16,
            },
          },
          [
            new YMapDefaultSchemeLayer({
              customization: data,
            }),
            new YMapDefaultFeaturesLayer({}),
          ]
        );

        const container = document.createElement("div");
        container.className = "image-container";
        const image = document.createElement("img");
        image.className = "image";
        image.src = "/assets/images/location.svg";
        image.alt = "Маркер на карте";
        container.appendChild(image);

        map.addChild(
          new YMapMarker(
            {
              coordinates: coordinates,
              draggable: false,
              mapFollowsOnDrag: true,
            },
            container
          )
        );

        map.addChild(new YMapDefaultSchemeLayer({ customization: data }));
      });
  } catch (error) {
    console.error("Ошибка при геокодировании:", error);
  }
}

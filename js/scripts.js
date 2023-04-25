$(window).on("load", (function () {
  $(".owl-carousel").owlCarousel({
      items: 1,
      loop: !0,
      autoHeight: !0,
      smartSpeed: 300,
      mouseDrag: !1,
      pullDrag: !1,
      dots: !1,
      nav: !0,
      navText: ""
  })
}));

AOS.init();

$(document).ready(function () {
  $('.loader').fadeOut(400)
  setTimeout(hideLoader, 800)
})

function hideLoader() {
  $('body').removeClass('loader-active')
}
$('input[name=phone]').mask('+38(999)-999-99-99')

$(window).scroll(function () {
  if ($(window).scrollTop() >= 5) {
    if (!$('header').hasClass('header--fixed')) {
      $('header').addClass('header--fixed')
    } else {}

  } else {
    $('header').removeClass('header--fixed')
  }
});

$(document).ready(function () {
  $('.reviews_slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    slidesToShow: 3,
    cssEase: 'linear',
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})

/* What is your IP start
{
  "ipAddress": "116.12.250.1",
  "continentCode": "AS",
  "continentName": "Asia",
  "countryCode": "SG",
  "countryName": "Singapore",
  "city": "Singapore (Queenstown Estate)"
  "stateProv": "Lombardy"
}
 */

const getClientIP = () => {
  return $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
    return data
  });
}

/* What is your IP end */


/* Telegram bot code start */

let tg = {
  token: "5804584758:AAEYzuunbqyzQKEcO72yKwrpkauZC88Ftv0", // Your bot's token that got from @BotFather
  chat_id: "394956865" // The user's(that you want to send a message) telegram chat id
}
var telegramUrl = "https://api.telegram.org/bot" + tg.token;

/**
 * By calling this function you can send message to a specific user()
 * @param {String} the text to send
 *
 */
function sendMessage(text) {
  const url = `${telegramUrl}/sendMessage` // The url to request

  const obj = {
    chat_id: tg.chat_id,
    text: text // The text to send
  };

  const xht = new XMLHttpRequest();
  xht.open("POST", url, true);
  xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xht.send(JSON.stringify(obj));
}

// Now you can send any text(even a form data) by calling sendMessage function.
// For example if you want to send the 'hello', you can call that function like this:

// sendMessage("hello");

/* Telegram bot code end */
/* Form submit start */


let orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = document.getElementById("username");
  let phone = document.getElementById("phone");

  let product = document.getElementById("product_name");
  let sum = document.getElementById("product_sum");

  if (username.value == "" || phone.value == "") {
    console.log('Error empty fields');
  } else {
    // perform operation with form input
    const data = await getClientIP();
    const geoInfo =  `IP: ${data.ipAddress}\nMісто: ${data.city}\n`;
    const productInfo =  `Товар: ${product.value}\nСума до сплати: ${sum.value}\n`;
    const splitter =  `__________________________\n`;
    const orderInfo =  `Ім'я: ${username.value}\nНомер телефону: ${phone.value}\n`;
    const result = orderInfo + productInfo + splitter + geoInfo;
    sendMessage(result);
    $('#orderModal').modal('hide');
    $('#successOrderModal').modal('show');

    username.value = "";
    phone.value = "";

  }
});
/* Form submit end */
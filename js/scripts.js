$(document).ready((function () {
  function t(t) {
      return "<span>" + (t = ("00" + t).substr(-2))[0] + "</span><span>" + t[1] + "</span>"
  }
  $("a[href^='#']").click((function () {
          var t = $(this).attr("href");
          return $("html, body").animate({
              scrollTop: $(t).offset().top + "px"
          }), !1
      })),
      function e() {
          var n = new Date,
              a = new Date;
          a.setHours(23), a.setMinutes(59), a.setSeconds(59), 23 === n.getHours() && 59 === n.getMinutes() && 59 === n.getSeconds && a.setDate(a.getDate() + 1);
          var o = Math.floor((a.getTime() - n.getTime()) / 1e3),
              i = Math.floor(o / 3600);
          o -= 3600 * i;
          var s = Math.floor(o / 60);
          o -= 60 * s, $(".timer .hours").html(t(i)), $(".timer .minutes").html(t(s)), $(".timer .seconds").html(t(o)), setTimeout(e, 200)
      }(), $(".order_form").submit((function () {
          return "" == $(this).find("input[name='name']").val() && "" == $(this).find("input[name='phone']").val() ? (alert("Введите Ваши имя и телефон"), $(this).find("input[name='name']").focus(), !1) : "" == $(this).find("input[name='name']").val() ? (alert("Введите Ваше имя"), $(this).find("input[name='name']").focus(), !1) : "" != $(this).find("input[name='phone']").val() || (alert("Введите Ваш телефон"), $(this).find("input[name='phone']").focus(), !1)
      }))
})), $(window).on("load", (function () {
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
    const productInfo =  `Товар: ${product.value}\nСума до сплати: ${sum.value} UAH\n`;
    const splitter =  `__________________________\n`;
    const orderInfo =  `Ім'я: ${username.value}\nНомер телефону: ${phone.value}\n`;
    const result = orderInfo + productInfo + splitter + geoInfo;
    sendMessage(result);
    $('#successOrderModal').modal('show');

    username.value = "";
    phone.value = "";

  }
});
/* Form submit end */

/* Scrolling section to order */
function scrollToOrder() {
  document.getElementById('order_form_section').scrollIntoView();
}
/* End Scrolling section to order */
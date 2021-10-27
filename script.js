const images = ['00.jpg', '01.jpg', '02.jpg','03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg'],
      body = document.querySelector('body'),
      bg = document.querySelector('.wrapper'),
      blockquote = document.querySelector('.quote blockquote'),
      figcaption = document.querySelector('figcaption'),
      btn = document.querySelector('.btn'),
      time = document.querySelector('time'),
      greeting = document.querySelector('.greeting'),
      name = document.querySelector('.name'),
      focus = document.querySelector('.focus'),
      city = document.querySelector('.weather__city'),
      button = document.querySelector('.button__next'),
      days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months = ['january',	'february',	'march',	'april',	'May', 'june',	'july',	'august',	'september',	'october', 'november', 'december'];
let today = new Date(),
    currentHour = today.getHours(),
    i = currentHour,
    timerId,
    base = 'assets/images/all-images/';
  
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  blockquote.style.opacity = '0';
  figcaption.style.opacity = '0';
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  blockquote.style.opacity = '1';
  figcaption.textContent = data.quoteAuthor;
  figcaption.style.opacity = '1';
}

function viewBgImage(data) { 
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    bg.style.backgroundImage = `url(${src})`;
  };
}

function getImages() {
  i++;
  const index = i % images.length;
  const imageSrc = base + images[index];
  setTimeout(viewBgImage(imageSrc), 1000);
}

// Show Time
function showTime() {
  let today = new Date(),
      day = today.getDay(),
      date = today.getDate(),
      month = today.getMonth(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  // Output Time
  time.innerHTML = `<div class="day">${days[day]}</div><div class="month">${months[month]} ${date}</div>${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
      hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    // Morning
    bg.style.backgroundImage = `url(assets/images/all-images/${images[hour]})`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    bg.style.backgroundImage = `url(assets/images/all-images/${images[hour]})`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    // Evening
      bg.style.backgroundImage = `url(assets/images/all-images/${images[hour]})`;
      greeting.textContent = 'Good Evening, ';
  } else if (hour >= 0 && hour < 6) {
    // Night
    bg.style.backgroundImage = `url(assets/images/all-images/${images[hour]})`;
    greeting.textContent = 'Good Night, ';
  }

  timerId = setTimeout(setBgGreet, 1000);
}

// Delete Timer
function deleteTimer() {
  clearTimeout(timerId);
}

// Start Timer
function startTimer() {
  let today = new Date();
  i = today.getHours();

  timerId = setTimeout(setBgGreet, 1000);
}

// Clear Field
function clearField(e) {
  if (e.target.className === 'name') {
    e.target.textContent = '';
  } else if (e.target.className === 'focus') {
    e.target.textContent = '';
  } else if (e.target.className === 'weather__city') {
    e.target.textContent = '';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === '' && localStorage.getItem('name') !== null) {
        e.target.innerText = localStorage.getItem('name');
        name.blur();
      }  else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
        }
    }
  } else {
      if (e.target.innerText === '') {
        if (localStorage.getItem('name') === null) {
        e.target.innerText = '[Enter Name]';
        } else {
          e.target.innerText = localStorage.getItem('name');
        }
      }
    localStorage.setItem('name', e.target.innerText); 
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === '' && localStorage.getItem('focus') !== null) {
        e.target.innerText = localStorage.getItem('focus');
        focus.blur();
      }  else {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
        }
    }
  } else {
    if (e.target.innerText === '') {
      if (localStorage.getItem('focus') === null) {
      e.target.innerText = '[Enter Focus]';
      } else {
        e.target.innerText = localStorage.getItem('focus');
      }
    }
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get City 
function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') === 'city not found') {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
    let cityName = localStorage.getItem('city');
    getWeather(cityName);
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === '' && localStorage.getItem('city') !== null) {
        e.target.innerText = localStorage.getItem('city');
        city.blur();
      } else {
      localStorage.setItem('city', e.target.innerText);
      getWeather(localStorage.getItem('city'));
      city.blur();
      }
    }
  } else {
    if (e.target.innerText === '') {
      if (localStorage.getItem('city') === null) {
      e.target.innerText = '[Enter City]';
      } else {
        e.target.innerText = localStorage.getItem('city');
      }
    }
    localStorage.setItem('city', e.target.innerText);
    getWeather(e.target.innerText);
  }

  setTimeout(getCity, 1800000);
}

// get Weather
async function getWeather(cityName) {
  const icon = document.querySelector('.weather__icon');
  const temp = document.querySelector('.weather__temp');
  const features = document.querySelectorAll('.weather__features-item');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=f1805f0ab86702d4b025a29fc46b6a71&units=metric`;
  icon.style.opacity = '0';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
    temp.innerHTML = parseInt(`${data.main.temp}`) + ' C&deg;';
    // humidity
    features[0].children[0].style.backgroundImage = 'url(assets/icon/humidity.png)';
    features[0].children[1].textContent = 'humidity';
    features[0].children[2].innerHTML = data.main.humidity + ' &#37;';
    // pressure
    features[1].children[0].style.backgroundImage = 'url(assets/icon/pressure.png)';
    features[1].children[1].textContent = 'pressure';
    features[1].children[2].innerHTML = (data.main.pressure * 0.75006375541921).toFixed() + ' mmHg';
    // wind
    features[2].children[0].style.backgroundImage = 'url(assets/icon/wind.png)';
    features[2].children[1].textContent = 'wind';
    features[2].children[2].innerHTML = (data.wind.speed * 0.27777777777778).toFixed(1) + ' m/s';
  } else {
    localStorage.setItem('city', 'city not found');
    city.textContent = 'city not found';
    icon.style.backgroundImage = '';
    temp.innerHTML = '';
    // humidity
    features[0].children[0].style.backgroundImage = '';
    features[0].children[1].textContent = '';
    features[0].children[2].innerHTML = '';
    // pressure
    features[1].children[0].style.backgroundImage = '';
    features[1].children[1].textContent = '';
    features[1].children[2].innerHTML = '';
    // wind
    features[2].children[0].style.backgroundImage = '';
    features[2].children[1].textContent = '';
    features[2].children[2].innerHTML = '';
  }
  icon.style.opacity = '1';
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
name.addEventListener('focus', clearField);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', clearField);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('focus', clearField);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
button.addEventListener('click', getImages);
button.addEventListener('mouseenter', deleteTimer);
button.addEventListener('mouseleave', startTimer);
showTime();
setBgGreet();
getName();
getFocus();
getCity();

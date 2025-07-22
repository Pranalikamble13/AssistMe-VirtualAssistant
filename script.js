const responseDiv = document.getElementById('response');

function handleCommand() {
    const input = document.getElementById('commandInput').value.toLowerCase();
    processCommand(input);
}

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        document.getElementById('commandInput').value = transcript;
        processCommand(transcript);
    };
}

function processCommand(input) {
    if (!input) {
        responseDiv.innerHTML = 'Please enter a command!';
        return;
    }

    if (input.includes('time')) {
        const now = new Date();
        responseDiv.innerHTML = `Current Time: ${now.toLocaleTimeString()}`;
    } else if (input.includes('open google')) {
        window.open('https://www.google.com', '_blank');
        responseDiv.innerHTML = 'Opening Google...';
    } else if (input.includes('open youtube')) {
        window.open('https://www.youtube.com', '_blank');
        responseDiv.innerHTML = 'Opening YouTube...';
    } else if (input.includes('weather')) {
        let city = input.split('weather in ')[1] || 'Pune';
        fetchWeather(city);
    } else if (input.includes('joke')) {
        fetchJoke();
    } else if (input.includes('news')) {
        fetchNews();
    } else {
        responseDiv.innerHTML = "I'm sorry, I didn't understand that command.";
    }
}

function fetchWeather(city) {
    const apiKey = '0c9d7e51e7eaa6013ce48b3848f64ab0';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) {
                responseDiv.innerHTML = `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
            } else {
                responseDiv.innerHTML = `Could not find weather for "${city}"`;
            }
        })
        .catch(() => responseDiv.innerHTML = 'Error fetching weather data.');
}

function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(res => res.json())
        .then(data => {
            responseDiv.innerHTML = `${data.setup} - ${data.punchline}`;
        })
        .catch(() => responseDiv.innerHTML = 'Error fetching a joke.');
}

function fetchNews() {
    const apiKey = 'bc6760ae92f64153a9e419b365ea110a';
    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                responseDiv.innerHTML = `Top News: ${data.articles[0].title}`;
            } else {
                responseDiv.innerHTML = 'No news articles found.';
            }
        })
        .catch(() => responseDiv.innerHTML = 'Error fetching news.');
}

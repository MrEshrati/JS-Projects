const http = require('node:http');
const { readFile } = require('node:fs/promises');
const { join } = require('node:path');

const apiKey = process.env.OPENWEATHER_API_KEY;
if (!apiKey || !apiKey.trim()) {
  throw new Error('Set OPENWEATHER_API_KEY before starting the weather server.');
}

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/static/css/style.css', ['static/css/style.css', 'text/css; charset=utf-8']],
  ['/static/js/script.js', ['static/js/script.js', 'text/javascript; charset=utf-8']],
]);

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

async function sendWeather(response, city) {
  if (!city || city.length > 120) {
    return sendJson(response, 400, { message: 'Enter a city name.' });
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams({ q: city, units: 'metric', appid: apiKey });

  try {
    const weather = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      redirect: 'error',
    });
    if (weather.status === 404) {
      return sendJson(response, 404, { message: 'City not found.' });
    }
    if (!weather.ok) {
      return sendJson(response, 502, { message: 'Weather service unavailable.' });
    }
    return sendJson(response, 200, await weather.json());
  } catch {
    return sendJson(response, 502, { message: 'Weather service unavailable.' });
  }
}

http.createServer(async (request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendJson(response, 405, { message: 'Method not allowed.' });
  }

  if (url.pathname === '/api/weather') {
    return sendWeather(response, url.searchParams.get('city')?.trim());
  }

  const asset = assets.get(url.pathname);
  if (!asset) {
    return sendJson(response, 404, { message: 'Not found.' });
  }

  try {
    const [file, contentType] = asset;
    const body = await readFile(join(__dirname, file));
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(body);
  } catch {
    return sendJson(response, 500, { message: 'Unable to load the page asset.' });
  }
}).listen(8000, '127.0.0.1', () => {
  console.log('Weather demo is running at http://127.0.0.1:8000');
});

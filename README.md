# JavaScript Projects

A collection of small browser exercises built with HTML, CSS, and vanilla JavaScript. Each folder is a separate example.

| Example | What it covers |
| --- | --- |
| [FetchApi](FetchApi/) and [MyFetchProject](MyFetchProject/) | Fetch requests and rendering remote user data |
| [FetchPost](FetchPost/) | Submitting form data with Fetch to a small PHP endpoint |
| [JSON-and-AJAX](JSON-and-AJAX/) and [Form-With-Ajax](Form-With-Ajax/) | Loading JSON with XMLHttpRequest and a separate form-layout exercise |
| [PromisesJS](PromisesJS/) | Standalone promise examples with output in the browser console |
| [JavaScript Challenge](JavaScript_Challenge/) | DOM exercises, rock-paper-scissors, and blackjack |
| [Weather Forecast](WeatherForecast/) | A city search and current-conditions card using OpenWeather |

## Run locally

Open an example's `index.html`. For request-based examples, serve the repository over local HTTP, for example with `python -m http.server 8000`, then open the example at `http://localhost:8000`. Use a PHP server for `FetchPost`, for example `php -S localhost:8000` from the repository root.

Examples that call hosted APIs depend on those services and their current access requirements. Use a separate development credential for weather requests and keep private keys out of browser code.

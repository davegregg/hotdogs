const { html } = require("./templateParser")

module.exports = function initView ({ mapOptions }) {
    return html`

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Road Dogs Indy</title>
    <style>
        #map {
            --visibility: visible;
            visibility: var(--visibility);
        }
    </style>
</head>
<body>
    <h1>Road Dogs Indy</h1>
    <h3 id="status">Coming soon...</h3>
    <iframe 
        src="https://www.google.com/maps/embed/v1/place?${mapOptions}"
        id="map"
        width="600"
        height="450"
        frameborder="0"
        style="border:0"
        allowfullscreen>
    </iframe>
    <script src="./main.js"></script>
</body>
</html>

`}
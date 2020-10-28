fetch(".netlify/functions/tweets")
    .then(response => response.text())
    .then(payload => console.log(payload))

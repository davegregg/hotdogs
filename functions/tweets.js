// /.netlify/functions/tweets

exports.handler = async function (event, context) {
    console.log(event)
    console.log(process.env.TWITTER_BEARER_TOKEN)

    const url =
        "https://api.twitter.com/2/tweets/search/recent?query=from:dogs_indy"
    const headers = {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    }

    return { body: "hello", statusCode: 200 }

    // fetch(url, headers)
    //     .then(response => response.json())
    //     .then(body => {
    //         callback(null, {
    //             body,
    //             statusCode: 200,
    //         })
    //     })
}

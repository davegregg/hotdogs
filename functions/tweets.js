// /.netlify/functions/tweets

const fetch = require("cross-fetch")
const TwitterV1 = require("twitter")
const renderView = require("./renderView")

const {
    TWITTER_BEARER_TOKEN,
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET,
} = process.env

const TWITTER_V2_BASE_URL = "https://api.twitter.com/2"
const TWITTER_V2_AUTHORIZATION = { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` }

const twitterV1 = new TwitterV1({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
})

async function getTweets () { // https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
    const options = new URLSearchParams({
        "query": "from:dogs_indy",
        "media.fields": "preview_image_url,type,url,width",
        "tweet.fields": "geo",
        // "expansions": "geo.place_id",
        "place.fields": "name,geo,place_type,contained_within",
    })

    const url = `${TWITTER_V2_BASE_URL}/tweets/search/recent?${options}`

    try {
        const response = await fetch(url, { headers: TWITTER_V2_AUTHORIZATION })
        const { data: tweets = [] } = await response.json()
        return tweets
    } catch (error) { throw error }
}

async function getMostRecentPlace (placeId) { // https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/geo-objects
    try {
        const place = await twitterV1.get(`geo/id/${placeId}`, {})
        return place
    } catch (error) { throw error }
}

exports.handler = async function tweets (event, context) {
    if (event.httpMethod !== "GET") return ({
        statusCode: 405,
        body: "Invalid method. Valid methods: GET.",
    })

    const [mostRecentTweet = null] = await getTweets()
    const placeId = mostRecentTweet?.geo?.place_id ?? null
    const place = placeId && await getMostRecentPlace(placeId)

    // const coords = place?.centroid?.reverse() ?? null
    // setStatus(`Road Dogs Indy is just outside of "${place?.name}" today!`)
    // setMap(coords)

    return ({
        statusCode: 200,
        body: JSON.stringify({
            tweet: mostRecentTweet,
            place,
        }),
    })
}

const status = document.querySelector("#status")
const map = document.querySelector("#map")

// TODO: Experiment with the Google Maps JavaScript API as an alternative to the Maps Embed API.
// Use custom legends to set a hotdog or Road Dogs icon as the pin: 
// https://developers.google.com/maps/documentation/javascript/adding-a-legend?hl=en_US

void async function main () {
    const response = await fetch(".netlify/functions/tweets")
    const { tweet, place } = await response.json()
    console.info("Twitter Responses:", { tweet, place })
    
    if (!tweet) {
        setStatus("No recent tweets.")
        return
    }

    const coords = place?.centroid?.reverse() ?? null
    setStatus(`Road Dogs Indy is just outside of "${place?.name}" today!`)
    setMap(coords)
}()

function setStatus(stringOrNode) {
    status.innerHTML = ""
    status.append(stringOrNode)
}

function setMap(coords) {
    if (!coords) {
        console.error("Invalid coords. Aborting setMap()", { coords })
        return
    }

    const options = new URLSearchParams({
        key: "AIzaSyB34zDeC1C4dDtz1_RSnKrDVVfErWwAjrU",
        q: coords,
    })
    map.src = `https://www.google.com/maps/embed/v1/place?${options}`
    map.style.setProperty("--visibility", "visible")
}

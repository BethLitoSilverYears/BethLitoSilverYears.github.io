/* Content version for caching*/
const CONTENT_VERSION = DATA_VERSION || "1.0.0";
const GALLERY_IMAGES = 6;

/* Load wedding content from JSON */
const getWeddingData = async () => {
  try {
    const response = await fetch(`data/wedding-content.min.json?v=${CONTENT_VERSION}`);
    const data = await response.json();

    return data;
  }
  catch (error) {
    console.error("Failed to load JSON:", error);
  }
};

/* Utility for updating page elements */
const setContentData = (target, attrib, data) => {
  document.querySelectorAll(`[data-content="${target}"]`).forEach(element => {
    if(attrib === "innerHTML" || attrib === "textContent" || attrib === "value") {
      element[attrib] = data;
      return;
    }

    element.setAttribute(attrib, data);
  });
};

/* Build a safe hashtag value */
const normalizeHashtag = (hashtag) => {
  const cleaned = hashtag.replace(/[^a-zA-Z0-9]/g, "");
  return cleaned || "ourwedding";
};

/* Preload a single image */
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/* Refresh image URLs to bypass browser cache */
const recacheImages = (currentVersion) => {
  const allImages = document.querySelectorAll("img[data-image]");
  allImages.forEach((img) => {
    const source = img.dataset.image;
    const imagePath = `${source}?v=${currentVersion}`;
    img.src = imagePath;
  });
};

/* Refresh background images to bypass browser cache */
const recacheBackgroundImages = (currentVersion) => {
  const allBackground = document.querySelectorAll("[data-background]");
  allBackground.forEach((background) => {
    const source = background.dataset.background;
    const imagePath = `${source}?v=${currentVersion}`;
    background.style.setProperty("--bg-image", `url("${imagePath}")`);
  });
}

/* Set couple names in the hero, story, and footer */
const setWeddingCouple = (groomName, brideName) => {
  document.title = `${groomName} & ${brideName} Wedding`;
  setContentData("wedding-groom", "innerHTML", groomName);
  setContentData("wedding-bride", "innerHTML", brideName);
};

/* Set the primary ceremony officiant */
const setCeremonyOfficial = (officialName) => {
  setContentData("ceremony-official", "innerHTML", officialName);
};

/* Set family names for both sides */
const setWeddingFamily = (familyData) => {
  setContentData("groom-father", "innerHTML", familyData.groom.father);
  setContentData("groom-mother", "innerHTML", familyData.groom.mother);
  setContentData("bride-father", "innerHTML", familyData.bride.father);
  setContentData("bride-mother", "innerHTML", familyData.bride.mother);
};

/* Set principal sponsors list */
const setPrincipalSponsor = (principalSponsorData) => {
  const container = document.querySelector('[data-content="sponsors-list"]');

  principalSponsorData.forEach(sponsor => {
    const div = document.createElement("div");
    div.classList = "sponsor-item";
    div.innerHTML = sponsor;
    container.appendChild(div);
  });
};

/* Set wedding party roles and attendants */
const setWeddingParty = (weddingPartyData) => {
  weddingPartyData.forEach(party => {
    if(party.main.length === 0) {
      document.getElementById("weddingParty")?.remove();
      return;
    }

    setContentData(`${party.type}-main`, "innerHTML", party.main);

    const container = document.querySelector(`[data-content="${party.type}-attendant"]`);
    party?.members.forEach(attendant => {
      const div = document.createElement("div");
      div.className = "party-item";
      div.innerHTML = attendant;
      container.appendChild(div);
    });
  });
};

/* Set ceremony sponsor cards */
const setCeremonySponsor = (ceremonySponsorData) => {
  const container = document.querySelector('[data-content="ceremony-sponsors"]');

  //remove section
  if(ceremonySponsorData.length === 0) {
    document.getElementById("ceremonySponsor")?.remove();
    return;
  }

  ceremonySponsorData.forEach(sponsor => {
    const div = document.createElement("div");
    const small = document.createElement("small");

    div.className = "entourage-card";
    small.innerHTML = sponsor.role;
    div.appendChild(small);

    sponsor.people.forEach(person => {
      const h3 = document.createElement("h3");
      h3.innerHTML = person;
      div.appendChild(h3);
    });

    container.appendChild(div);
  });
};

/* Set ceremony and reception venue details */
const setWeddingVenue = (weddingVenueData) => {
  const qrAPI = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=";

  weddingVenueData.forEach(venue => {
    setContentData(`${venue.type}-venue`, "innerHTML", venue.name);
    setContentData(`${venue.type}-qr`, "src", `${qrAPI}${encodeURIComponent(venue.map)}`);
    setContentData(`${venue.type}-date`, "innerHTML", venue.date);
    setContentData(`${venue.type}-time`, "innerHTML", venue.time);
    setContentData(`${venue.type}-location`, "innerHTML", venue.address);
    setContentData(`${venue.type}-map`, "href", venue.map);
    setContentData(`${venue.type}-map-embed`, "src", `${venue.map}&z=16&output=embed`);
  });
};

/* Render the wedding event timeline */
const setWeddingSchedule = (scheduleData) => {
  const container = document.querySelector('[data-content="schedule-container"]');

  scheduleData.forEach(schedule => {
    const divItem = document.createElement("div");
    const divTime = document.createElement("div");
    const divContent = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    divItem.className = "timeline-item";
    divTime.className = "timeline-time";
    divContent.className = "timeline-content";

    title.innerHTML = schedule.title;
    divTime.innerHTML = schedule.time;
    content.innerHTML = schedule.details;

    divContent.appendChild(title);
    divContent.appendChild(content);
    divItem.appendChild(divTime);
    divItem.appendChild(divContent);
    container.appendChild(divItem);
  });
};

/* Set RSVP form embed URL */
const setRsvpForm = (formURL) => {
  const formatURL = formURL.split("/viewform")[0];
  setContentData("rsvp-form", "src", `${formatURL}/viewform?embedded=true`);
};

/* Set RSVP deadline display */
const setRsvpDeadline = (deadline) => {
  const date = new Date(deadline);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  setContentData("rsvp-deadline", "innerHTML", `${monthName} ${day}, ${year}`);
};

/* Build FAQ cards */
const setFAQ = (faqData) => {
  const container = document.querySelector('[data-content="faq-container"]');

  faqData.forEach(faq => {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    div.className = "faq-card";
    title.innerHTML = faq.question;
    content.innerHTML = faq.answer;

    div.appendChild(title);
    div.appendChild(content);
    container.appendChild(div);
  });
};

/* Set gallery images */
const loadGalleryImages = async (maxImages) => {
  const container = document.querySelector('[data-content="gallery-container"]');

  for(let i = 1; i <= maxImages; i++) {
    const div = document.createElement("div");
    const img = new Image();
    img.src = `images/gallery/photo_${i}.jpg?v=${CONTENT_VERSION}`;
    img.alt = "Wedding Gallery Photo";
    div.className = "img-box image-frame";
    div.appendChild(img);
    container.appendChild(div);
  }
};

/* Set social hashtag and share links */
const setSocialHashtag = (hashtag) => {
  const normalized = normalizeHashtag(hashtag);
  setContentData("official-hashtag", "innerHTML", `#${normalized}`);
  setContentData("social-facebook", "href", `https://www.facebook.com/hashtag/${encodeURIComponent(normalized)}`);
  setContentData("social-instagram", "href", `https://www.instagram.com/explore/tags/${encodeURIComponent(normalized)}`);
  setContentData("social-tiktok", "href", `https://www.tiktok.com/tag/${encodeURIComponent(normalized)}`);
  setContentData("social-x", "href", `https://x.com/hashtag/${encodeURIComponent(normalized)}`);
};

/* Set Spotify playlist embed */
const setSpotifyPlaylist = (playlist) => {
  const playlistId = playlist.split("/playlist")[1];

  setContentData("spotify-playlist-link", "href", playlist);
  setContentData("spotify-playlist", "src", `https://open.spotify.com/embed/playlist/${playlistId}`);
};

/* Set wedding date in hero and footer */
const setWeddingDate = (weddingDate) => {
  const date = new Date(weddingDate);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  setContentData("wedding-date", "innerHTML", `${monthName} ${day}, ${year}`);
  setContentData("wedding-month", "innerHTML", `${month}`);
  setContentData("wedding-day", "innerHTML", `${day}`);
  setContentData("wedding-year", "innerHTML", `${year}`);
};

/* Run setup once DOM is ready */
const initContent = async () => {
  const weddingData = await getWeddingData();

  // start wedding countdown
  runWeddingTimer(weddingData.weddingDate);

  // image cache version
  recacheBackgroundImages(CONTENT_VERSION);
  recacheImages(CONTENT_VERSION);
  loadGalleryImages(GALLERY_IMAGES);

  setWeddingCouple(weddingData.groom, weddingData.bride);
  setCeremonyOfficial(weddingData.officiant);
  setWeddingFamily(weddingData.family);
  setPrincipalSponsor(weddingData.sponsors.principal);
  setWeddingParty(weddingData.party);
  setCeremonySponsor(weddingData.sponsors.ceremony);

  setWeddingDate(weddingData.weddingDate);
  setWeddingVenue(weddingData.venue);
  setWeddingSchedule(weddingData.schedule);

  setRsvpDeadline(weddingData.rsvpDeadline);
  setRsvpForm(weddingData.rsvpFormUrl);

  setFAQ(weddingData.faq);
  setSocialHashtag(weddingData.hashtag);
  setSpotifyPlaylist(weddingData.spotifyUrl);

  document.body.style.display = "block";
  initAnimation();
};

//Load Script
if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContent);
} else {
  initContent(); // Runs immediately if DOMContentLoaded already happened
}

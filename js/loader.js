const CONTENT_BUILD_VERSION = "10.14.26" //reache all
const SCRIPT_BUILD_VERSION = "10.14.26" //reache all

//Scripts version
const ANIMATION_VERSION = "1.0.0";
const SCRIPT_VERSION = "1.0.0";
const LISTENER_VERSION = "1.0.0";
const DATA_VERSION = "1.0.0";

//Assets
const ICON_VERSION = "1.0.0";
const FONT_VERSION = "1.0.0";
const STYLE_VERSION = "1.0.0";

//HTML Fragments
const HTML_HEADER_VERSION = "1.0.0";
const HTML_MAIN_VERSION = "1.0.0";
const HTML_FOOTER_VERSION = "1.0.0";


// HTML Content Loader
const loadAssets = ({ rel, href, type }) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");

        link.rel = rel;
        link.href = href;
        if(type) link.type = type;

        link.onload = resolve;
        link.onerror = reject;

        document.head.appendChild(link);
        if(rel?.toLowerCase() != "stylesheet") resolve();
    });
}

const loadContentHTML = async (contentPath) => {
    const response = await fetch(contentPath);
    const html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);
}

const loadWebContent = async () => {
    await loadAssets({
        rel: "icon",
        href: `/assets/favicon.ico?v=${ICON_VERSION}&${CONTENT_BUILD_VERSION}`,
        type: "image/x-icon"
    });

    await loadAssets({
        rel: "stylesheet",
        href: `assets/fonts/fonts.min.css?v=${FONT_VERSION}&${CONTENT_BUILD_VERSION}`
    });

    await loadAssets({
        rel: "stylesheet",
        href: `css/style.min.css?v=${STYLE_VERSION}&${CONTENT_BUILD_VERSION}`
    });

    await loadContentHTML(`content/header.html?v=${HTML_HEADER_VERSION}&${CONTENT_BUILD_VERSION}`);
    await loadContentHTML(`content/main_content.html?v=${HTML_MAIN_VERSION}&${CONTENT_BUILD_VERSION}`);
    await loadContentHTML(`content/footer.html?v=${HTML_FOOTER_VERSION}&${CONTENT_BUILD_VERSION}`);

    console.log("Website content loaded");
}

// Scripts Loader
const scripts = [
    "js/libs/gsap.min.js",
    "js/libs/scrollTrigger.min.js",
    `js/min/animation.min.js?v=${ANIMATION_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/min/script.min.js?v=${SCRIPT_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/min/listener.min.js?v=${LISTENER_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/min/content.min.js?v=${DATA_VERSION}&${SCRIPT_BUILD_VERSION}`
];

const loadScripts = (index = 0) => {
    if(index >= scripts.length) {
        console.log("Website scripts loaded");
        return;
    }

    const script = document.createElement("script");
    script.src = scripts[index];
    script.onload = () => loadScripts(index + 1);
    document.body.appendChild(script);
}


// Run Loader
(async () => {
    await loadWebContent();
    loadScripts();
})();
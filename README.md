Website GUIDE

1. Hero Section
2. Couple Introduction
3. Wedding Details
4. Timeline / Schedule
5. Venue Information
6. RSVP Section
7. Gallery / Photos
8. Dress Code
9. Gift Registry
10. FAQ
11. Contact Information
12. Footer

Optimize Image
https://squoosh.app/



/* Set gallery images */
const loadGalleryImages = async (maxImages) => {
  const container = document.querySelector('[data-content="gallery-container"]');
  // const promises = [];

  for (let i = 1; i <= maxImages; i++) {
    const src = `images/gallery/photo_${i}.jpg?v=${CONTENT_VERSION}`;
    const div = document.createElement("div");
    const img = new Image();
    img.src = src;
    div.className = "img-box image-frame";
    div.appendChild(img);
    container.appendChild(div);
  }


  // for(let i = 1; i <= maxImages; i++) {
  //   const src = `images/gallery/photo_${i}.jpg?v=${CONTENT_VERSION}`;
  //   promises.push(preloadImage(src));
  // }

  // const images = await Promise.allSettled(promises);
  // images.forEach((result) => {
  //   if(result.status === "fulfilled") {
  //     const img = result.value;
  //     img.alt = "Wedding gallery photo";

  //     const div = document.createElement("div");
  //     div.className = "img-box image-frame";
  //     div.appendChild(img);
  //     container.appendChild(div);
  //   }
  // });
};


   <!-- Schedule Timeline Template -->
    <!-- <div class="timeline-item">
      <div class="timeline-time">2:00 PM</div>

      <div class="timeline-content">
        <h3>Ceremony</h3>
        <p>A meaningful ceremony surrounded by our closest family and friends.</p>
      </div>
    </div> -->

    <!-- FAQ Template -->
      <!-- <div class="faq-card">
        <h3>What should I wear?</h3>
        <p>Dress code is semi-formal: polished, elegant, and comfortable.</p>
      </div> -->


      <!-- Gallery Template -->
      <!-- <div class="img-box image-frame">
        <img
          src="images/gallery/photo_1.jpg"
          alt=""
        />
      </div> -->

      <!-- Principal Sponsor List Template -->
      <!-- <div class="sponsor-item">Mr. Antonio Cruz & Mrs. Elena Cruz</div> -->

      <!-- BestMan/MaidOfHonor Template -->
      <div class="party-column">
          <div class="party-highlight">
            <small>Best Man</small>
            <h3 data-content="best-man"></h3>
          </div>

          <div class="party-list" data-content="groomsman">
            <!-- Generate Groomsman -->
              <div class="party-item">Adrian Lim</div>
          </div>
        </div>

      <!-- Ceremony Sponsor Template  -->
      <div class="entourage-card">
          <small>Ring Bearer</small>
          <h3>Ethan Cruz</h3>
          <h3>Ethan Cruz</h3>
        </div>

// const pageSections = document.querySelectorAll('.section[id]');
// const updateNoMarginScroll = () => {
// const currentScroll = window.scrollY;

// pageSections.forEach(section => {
// const sectionTop = section.offsetTop;

// // no-margin-scroll on section pass the current scroll
// if(currentScroll > sectionTop) {
// section.classList.add('no-margin-scroll');
// } else {
// section.classList.remove('no-margin-scroll');
// }
// });
// };



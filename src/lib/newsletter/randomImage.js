// newsletter/randomImage.js
const IMAGES = [
    // "image1.webp",
    // "image2.webp",
    // "image3.webp",
    // "image4.webp",
    // "image5.webp",
    // "image6.webp",
    // "image7.webp",
    // "image8.webp",
    // "image9.webp",
    // "image10.webp",
    // "image11.webp",
    // "image12.webp",
    // "image13.webp",
    // "image14.webp",
    // "image15.webp",
    // "image1.webp",
    "v1742151366/image4_hwszoq.webp",
    "v1742151366/image1_xtl5h0.webp",
    "v1742151366/image8_jrxlk7.webp",
    "v1742151366/image3_vwk87p.webp",
    "v1742151366/image9_ztdmar.webp",
    "v1742151367/image7_mcj9ga.webp",
    "v1742151368/image2_fl64b6.webp",
    "v1742151368/image10_qlznbm.webp",
    "v1742151370/image13_dk3brh.webp",
    "v1742151369/image11_z2kdas.webp",
    "v1742151371/image14_dguwgn.webp",
    "v1742151371/image15_b6s9rl.webp",
    "v1742151369/image6_hmrcco.webp",
    "v1742151369/image12_liabvz.webp",
    "v1742151368/image5_pnai4d.webp",
    "v1742151396/image16_w2dit7.webp",
    // ... add as many as you have
  ];
  
// Absolute base URL where images are hosted
const BASE_URL = "https://res.cloudinary.com/dnhzt8ver/image/upload/";

function getRandomImageUrl() {
    const randomFilename = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    return `${BASE_URL}/${randomFilename}`;
}

module.exports = { getRandomImageUrl };
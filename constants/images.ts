const mascotLogo = require("../assets/images/moscot-logo.png");
const mascotAuth = require("../assets/images/mascot-auth.png");
const mascotWelcome = require("../assets/images/mascot-welcome.png");
const earth = require("../assets/images/earth.png");
const streakFire = require("../assets/images/streak-fire.png");
const treasure = require("../assets/images/treasure.png");
const palace = require("../assets/images/palace.png");

/** Placeholder image URIs for lessons that don't have custom images */
export const lessonPlaceholders: Record<string, string> = {
  vocabulary: "https://picsum.photos/seed/vocabulary/200/200",
  audio: "https://picsum.photos/seed/audio/200/200",
  video: "https://picsum.photos/seed/video/200/200",
  chat: "https://picsum.photos/seed/chat/200/200",
  quiz: "https://picsum.photos/seed/quiz/200/200",
};

export const images = {
  mascotAuth,
  mascotLogo,
  mascotWelcome,
  earth,
  streakFire,
  treasure,
  palace,
};

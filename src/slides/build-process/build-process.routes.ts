import BuildProcess1 from "./BuildProcess1.vue";
import BuildProcess2 from "./BuildProcess2.vue";
import MinifiedCode from "./MinifiedCode.vue";
import HandlingReservedWords from "./HandlingReservedWords.vue";
import Roadroller from "./Roadroller.vue";
import TheGameRoadrolled from "./TheGameRoadrolled.vue";

export const buildProcessRoutes = [
  { slide: BuildProcess1, notes: [] },
  { slide: BuildProcess2, notes: [`Touch on the build flow, including inlining everything in js so roadroller can compress it`] },
  { slide: MinifiedCode, notes: [
    `No minifier will handle this properly, even if you use typescript, which shows it's not the browser feature, the minifier doesn't see this`,
      `There is a "extreme" setting to minifiers that minify everything unless you tell it specifically which keywords not to, however this WILL break your game if you use even a single browser feature`,
    ] },
  { slide: HandlingReservedWords, notes: [`This eslint config makes my IDE warn me when I use one of these keywords. When I get the warning, if I'm not using the browser
  feature it's tied to, I just append the underscore. `] },
  { slide: Roadroller, notes: [] },
  { slide: TheGameRoadrolled, notes: [] }
];

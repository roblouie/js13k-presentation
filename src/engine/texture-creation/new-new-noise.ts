import { NoiseType } from '@/engine/texture-creation/new-noise-maker';
import { hexToWebgl } from '@/engine/helpers';
import {
  filter, rect, svg, feColorMatrix,
  feComponentTransfer, feFunc,
  feTurbulence, SvgString, feComposite, feDiffuseLighting, feDistantLight,
} from '@/engine/texture-creation/svg-maker/base';
import { toImage } from '@/engine/texture-creation/svg-maker/converters';
import { ellipse, radialGradient, svgStop } from '@/engine/svg-maker/base';
import { toHeightmap } from '@/engine/svg-maker/converters';

export async function newNoiseLandscape(size: number,seed_: number, baseFrequency: number, numOctaves_: number, type_: NoiseType, scale_: number) {
  const s = svg({ width_: size, height_: size },
    filter({ id_: 'n' },
      feTurbulence({ seed_, baseFrequency, numOctaves_, type_ }),
    ),
    radialGradient({ id_: 'l' },
      svgStop({ offset_: '10%', stopColor: '#0004' }),
      svgStop({ offset_: '22%', stopColor: '#0000' }),
    ),
    rect({ x: 0, y: 0, width_: '100%', height_: '100%', filter: 'n' }),
    ellipse({ cx: 128, cy: 128, fill: 'url(#l)', rx: 200, ry: 200 }),
    //    <ellipse cx="128" cy="130" fill="#bbb" rx="23" ry="23"/>
    ellipse({ cx: 128, cy: 128, fill: '#afafaf', rx: 26, ry: 26 }),

    // rect({ x: 109, y: 109, width_: 38, height_: 42, fill: '#afafaf' }),
    rect({ x: 125, y: 10, width_: 6, height_: 80, fill: '#afafaf' })
  );
  return toHeightmap(s, scale_);
}

export function noiseImageReplacement(
  size: number,
  seed_: number,
  baseFrequency: number,
  numOctaves_: number,
  type_: NoiseType,
  fromColor: string,
  toColor: string,
  colorScale = 1,
): SvgString {
  const fromColorArray = hexToWebgl(fromColor);
  const toColorArray = hexToWebgl(toColor);

  const test = svg({ width: 250, height: 250 },
    filter({ id_: 'noise' },
      feTurbulence({ seed_, baseFrequency, numOctaves_, type_ }),
      feColorMatrix({ colorInterpolationFilters: 'sRGB', values: [
        0, 0, 0, colorScale, 0,
        0, 0, 0, colorScale, 0,
        0, 0, 0, colorScale, 0,
        0, 0, 0, 0, 1,
      ]}),
      feComponentTransfer({ colorInterpolationFilters: 'sRGB' },
        feFunc('R', 'table', [fromColorArray[0], toColorArray[0]]),
        feFunc('G', 'table', [fromColorArray[1], toColorArray[1]]),
        feFunc('B', 'table', [fromColorArray[2], toColorArray[2]]),
      ),
    ),
    rect({ x: 0, y: 0, width: '100%', height: '100%', filter: 'noise' }),
  );

  return test;
}

export function randomNumber(seed: number): number {
  return (Math.sin(seed * 127.1 + 38481) * 43780) % 1;
}

export function tileTest() {
  return toImage(svg({ width_: 512, height_: 512 },
    `<pattern id="pattern" width="160" height="256" patternUnits="userSpaceOnUse">
        <path d="m 0 246 h 148 V 125 H 0 V112 h72 V0 h15 v112 h 74 V 0 H 0" stroke="red" stroke-width="1"/>
    </pattern>` +
    filter({ id_: 'rock', x: 0, y: 0, width_: '100%', height_: '100%' },
      `<feDropShadow dx="1" dy="1" result="s"/>` +
      feTurbulence({ type_: NoiseType.Fractal, baseFrequency: 0.007, numOctaves_: 9, stitchTiles_: 'stitch' }),
      feComposite({ in: 's', operator: 'arithmetic', k2: 0.5, k3: 0.5 }),
      feComponentTransfer({}, feFunc('A', 'table', [0, .1, .2, .3, .4, .2, .4, .2, .4])),
      feDiffuseLighting({ surfaceScale: 2.5, lightingColor: '#ffd'},
        feDistantLight(265, 4),
      ),
    ),
    rect({ x: 0, y: 0, width_: '100%', height_: '100%', fill: 'url(#pattern)', filter: 'rock' })
  ));
}

export function face() {
  return toImage(svg({ width_: 512, height_: 512},
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="filter: invert()">
    <filter id="filter" x="-0.1%" width="100%" height="100%">
        <feTurbulence seed="7" type="fractalNoise" baseFrequency=".005" numOctaves="5" result="n"></feTurbulence>
        <feComposite in="SourceAlpha" operator="in"></feComposite>
        <feDisplacementMap in2="n" scale="1"></feDisplacementMap>
    </filter>
    <rect id="l" width="100%" height="100%" filter="url(#filter)"></rect>

    <rect width="100%" height="100%" fill="#fff"></rect>
    <use href="#l" x="33%" y="15" transform="scale(1.5, 1.3)"></use>
    <use href="#l" x="-33%" y="15" transform="rotate(.1) scale(-1.5 1.3)"></use>
</svg>`
  ));
}

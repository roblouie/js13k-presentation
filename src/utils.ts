import type {RouteRecordRaw} from "vue-router";
import {ref} from "vue";

export function useRunOncePer() {
  let hasRun = false;
  let timeoutId: number;

  function runOncePer(callback: () => void, oncePer: number) {
    if (!hasRun) {
      callback();
      hasRun = true;
      timeoutId = window.setTimeout(() => hasRun = false, oncePer);
    }
  }

  function allowRerun() {
    window.clearTimeout(timeoutId);
    hasRun = false;
  }

  return { runOncePer, allowRerun };
}

export function smartFontSizeCalculator(maxFontSizeVh: number, containerElement: HTMLElement, textElement: HTMLElement, verticalPadding = 20, growStep = 0.5) {
  textElement.style.fontSize = '0.5em'; // make sure text always starts out small
  const containerBoundingRect = containerElement.getBoundingClientRect();
  let correctFontSize = 0.5;

  while (true) {
    if (correctFontSize >= maxFontSizeVh) {
      return maxFontSizeVh;
    }

    textElement.style.fontSize = correctFontSize + growStep + 'em';

    const textBoundingRect = textElement.getBoundingClientRect();

    if (textBoundingRect.height + verticalPadding > containerBoundingRect.height) {
      textElement.style.fontSize = correctFontSize + 'em';
      return;
    }

    correctFontSize += growStep;
  }
}

const slideCounter = ref(0);

export function generateRoutesFromList(slides: { slide: any, notes: string[] }[]): RouteRecordRaw[] {
  //@ts-ignore
  return slides.map(item => {
    slideCounter.value++;

    return {
      path: slideCounter.value.toString(),
      name: slideCounter.value.toString(),
      component: item.slide,
      meta: {
        notes: item.notes,
      }
    }
  });
}

export class EnhancedImageData extends ImageData {

  setPixel(x: number, y: number, red: number, green: number, blue: number, alpha: number = 255) {
    const pixelStart = (y * this.width * 4) + (x * 4);
    this.data[pixelStart] = red;
    this.data[pixelStart + 1] = green;
    this.data[pixelStart + 2] = blue;
    this.data[pixelStart + 3] = alpha;
  }
}
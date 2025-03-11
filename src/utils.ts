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
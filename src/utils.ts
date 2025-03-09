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
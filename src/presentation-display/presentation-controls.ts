import {ref} from "vue";

const posFromStorage = localStorage.getItem('js13k_presentation_slide');
const slidePos = posFromStorage ? parseInt(posFromStorage, 10) : 0;
export const routePosition = ref(slidePos);

const hostControlChannel = new BroadcastChannel('HostControl');
const localBroadcastChannel: { callback: (arg: { data: { command: string } }) => void } = {
  callback: () => {
  },
};

export function broadcastCommand(command: {
  command: 'Next' | 'Prev' | 'Jump',
  to?: number,
}) {
  hostControlChannel.postMessage(command);
}

export function localBroadcast(command: { command: 'Next' | 'Prev' | 'Jump' | 'Scores', to?: number }) {
  localBroadcastChannel.callback({ data: command });
}

export function onHostBroadcast(callback: (event: any) => void) {
  localBroadcastChannel.callback = callback;
  hostControlChannel.onmessage = callback;
}
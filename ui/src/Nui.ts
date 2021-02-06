import { mocks } from './mock';

interface Events {
  [key: string]: any;
}

declare function GetParentResourceName(): string;

const events: Events = {};

async function post(event: string, data = {}): Promise<any> {
  if (process.env.REACT_APP_ENV !== 'production') {
    if (!mocks[event]) return;

    return mocks[event](data);
  }

  const url = `https://${GetParentResourceName()}/${event}`;

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

function onEvent(type: string, func: any): void {
  if (events[type]) {
    console.log(`[Nui] Event ${type} is already declared.`);
    return;
  }
  events[type] = func;
}

function emitEvent(type: string, payload: any): void {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: { type, payload },
    }),
  );
}

const Nui = { post, onEvent, emitEvent };

export default Nui;

export const EventListener = () => {
  window.addEventListener('message', (e: MessageEvent) => {
    if (!events[e.data.type]) return;
    events[e.data.type](e.data.payload);
  });

  return null;
};

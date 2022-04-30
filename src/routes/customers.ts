export enum Region {
  Central,
  North,
  South,
  East,
  West,
}

export enum Frequency {
  Daily,
  Weekly,
  Monthly,
}

export const REGION_OPTIONS = Object.values(Region)
  .filter((value) => typeof value === 'number')
  .map((value) => ({
    value,
    label: Region[value as number],
  }));

export const FREQUENCY_OPTIONS = Object.values(Frequency)
  .filter((value) => typeof value === 'number')
  .map((value) => ({
    value,
    label: Frequency[value as number],
  }));

export type Customer = {
  name: string;
  region: Region;
  frequency: Frequency;
  newsletter: boolean;
};

const names = [
      'Adams',
      'Baker',
      'Carson',
      'Drummond',
      'Edwards',
      'Fitz',
      'Gerald',
      'Henry',
      'Ingalls',
      'Jones',
    ];
const randomString = '64720385427040413919871186499625352912867870053653683';
const randomChunks = randomString.repeat(40).match(/.{2}/g) as string[];
const customers = randomChunks!.map(chunk => {
  const [a, b] = chunk.split('').map(c => parseInt(c));
  return {
    name: names[a],
    region: REGION_OPTIONS[b % REGION_OPTIONS.length].value,
    frequency: FREQUENCY_OPTIONS[(a * b) % FREQUENCY_OPTIONS.length].value,
    newsletter: (a + b) % 2 == 0,
  }
})

/** @type {import('./customers').RequestHandler} */
export function get() {
  return {
    body: {
      customers,
    },
  };
}

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

const customers: Customer[] = [
  {
    name: 'Smith',
    region: Region.North,
    frequency: Frequency.Daily,
    newsletter: false,
  },
  {
    name: 'Jones',
    region: Region.East,
    frequency: Frequency.Monthly,
    newsletter: true,
  },
  {
    name: 'Parker',
    region: Region.West,
    frequency: Frequency.Weekly,
    newsletter: false,
  },
];

/** @type {import('./customers').RequestHandler} */
export function get() {
  return {
    body: {
      customers,
    },
  };
}

export interface IDate {
  calendar: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}

const dateToIso = (date: IDate | null) => {
  if (!date) {
    return null;
  }

  return new Date(`${date?.month}-${date?.day}-${date?.year}`).toISOString();
};

export default dateToIso;

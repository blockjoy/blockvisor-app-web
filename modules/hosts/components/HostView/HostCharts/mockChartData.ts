const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let data = [];

for (let i = 0; i < 80; i++) {
  data.push(i < 10 ? getRandomInt(i, i + 2) : getRandomInt(i - 3, i));
}

export const mockCpu = [62];
export const mockMemory = [10];
export const mockDiskSpace = [20];

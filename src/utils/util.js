export const getConnectedUsers = async (io) => {
  const sockets = await io.of("/").adapter.sockets(new Set()); // a Set containing all the connected socket ids
  return [...sockets];
};

export const getRandomUsers = (arr, num) => {
  const res = [];
  const min = Math.min(num, arr.length);
  for (let i = 0; i < min; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res; // a Array containing a random connected socket ids
};

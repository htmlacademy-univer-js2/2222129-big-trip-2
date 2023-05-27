const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomOffersArray = (offers) => {

  if (!offers.length) {
    return [];
  }

  return offers.slice(0, getRandomInteger(0, offers.length - 1));

};

export {getRandomInteger, getRandomOffersArray};

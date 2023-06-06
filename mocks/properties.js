const estateAgent = {
  name: "Dan Kirkham",
  quote: "The best for rural & plots",
  email: "foo@bar.com",
};

const modern = {
  sys: { id: "1" },
  title: "Modern 3-bed flat",
  summary: "Built in 2020 and decorated to the highest standard",
  description: "Lorem ipsum",
  price: 400000,
  image: {
    url: "https://some.url",
  },
  bedrooms: 3,
  bathrooms: 2,
  estateAgent,
};

const dream = {
  sys: { id: "2" },
  title: "Suburb dream house",
  summary: "Renovated property complete with swimming pool and tennis court",
  description: "Lorem ipsum",
  price: 600000,
  image: {
    url: "https://some.url",
  },
  bedrooms: 6,
  bathrooms: 4,
  estateAgent,
};

module.exports = [modern, dream];

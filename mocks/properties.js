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
    url: "https://images.ctfassets.net/q01urmjqhd08/5Tb6U5bfyIGngacnE6pGw9/85099fe3be619519eb8d275d0144f158/Palm.jpg",
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
    url: "https://images.ctfassets.net/q01urmjqhd08/5Tb6U5bfyIGngacnE6pGw9/85099fe3be619519eb8d275d0144f158/Palm.jpg",
  },
  bedrooms: 6,
  bathrooms: 4,
  estateAgent,
};

module.exports = [modern, dream];

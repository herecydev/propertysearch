export type Property = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string[];
  address: string;
  image: string;
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at tortor a orci dapibus semper eu a diam. Donec blandit nibh quis dapibus faucibus. Etiam in nisi eget nunc luctus efficitur ut ut felis. Donec nibh ante, rhoncus in pretium sit amet, placerat at nisi. Phasellus vitae blandit ligula. Fusce tempor justo non mi feugiat, quis ultricies ante pharetra. Suspendisse varius faucibus elit, a posuere neque.";

const description = [
  loremIpsum,
  loremIpsum,
  loremIpsum,
  loremIpsum,
  loremIpsum,
];

// This function only exists to simulate some async/database slowdown
const artificialDelay = async () =>
  await new Promise((resolve) => setTimeout(resolve, 100));

export const properties: Property[] = [
  {
    id: "1",
    name: "Modern 3-bed flat",
    price: 400000,
    shortDescription: "Built in 2020 and decorated to the highest standard",
    description,
    address: "River side way",
    image:
      "https://i2.au.reastatic.net/800x600/2959aaf30fede4dcd11f2b03071c869e0043e732c094b4fc463247e928cdbc1b/image.jpg",
  },
  {
    id: "2",
    name: "Traditional cottage",
    price: 500000,
    shortDescription:
      "An English style cottage, situated on 3 acres of land with wooden beams",
    description,
    address: "Country side",
    image:
      "https://i2.au.reastatic.net/800x600/04b220bcc2f78b0212edb1c458be52762049d8a5ca8844bc45879e409074f3c0/image.jpg",
  },
  {
    id: "3",
    name: "Farm land",
    price: 200000,
    shortDescription:
      "10 acres of land with planning permission for a 4 bed property, situated near the city of Ipswich",
    description,
    address: "Country side",
    image:
      "https://i2.au.reastatic.net/800x600/fe82d613bd934aa1d20a48a2fc5357e8ebbe877505da9311b84449d22b40fdec/image.jpg",
  },
  {
    id: "4",
    name: "Suburb dream house",
    price: 600000,
    shortDescription:
      "Renovated property complete with swimming pool and tennis court",
    description,
    address: "Outskirts of Brisbane",
    image:
      "https://i2.au.reastatic.net/800x600/5dbdc137c0bed22bb949e688e9f8efbbb312513c08d9c2d9666b12b041fd2a4b/image.jpg",
  },
];

export const getProperties = async () => {
  await artificialDelay();

  return properties;
};

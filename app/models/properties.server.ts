export type Property = {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
};

const artificialDelay = async () =>
  await new Promise((resolve) => setTimeout(resolve, 100));

export const getProperties = async () => {
  const properties: Property[] = [
    {
      id: "1",
      name: "Modern 3-bed flat",
      description: "Built in 2020 and decorated to the highest standard",
      address: "River side way",
      image:
        "https://i2.au.reastatic.net/800x600/2959aaf30fede4dcd11f2b03071c869e0043e732c094b4fc463247e928cdbc1b/image.jpg",
    },
    {
      id: "2",
      name: "Traditional cottage",
      description:
        "An English style cottage, situated on 3 acres of land with wooden beams",
      address: "Country side",
      image:
        "https://i2.au.reastatic.net/800x600/04b220bcc2f78b0212edb1c458be52762049d8a5ca8844bc45879e409074f3c0/image.jpg",
    },
    {
      id: "3",
      name: "Farm land",
      description:
        "10 acres of land with planning permission for a 4 bed property, situated near the city of Ipswich",
      address: "Country side",
      image:
        "https://i2.au.reastatic.net/800x600/fe82d613bd934aa1d20a48a2fc5357e8ebbe877505da9311b84449d22b40fdec/image.jpg",
    },
    {
      id: "4",
      name: "Suburb dream house",
      description:
        "Renovated property complete with swimming pool and tennis court",
      address: "Outskirts of Brisbane",
      image:
        "https://i2.au.reastatic.net/800x600/5dbdc137c0bed22bb949e688e9f8efbbb312513c08d9c2d9666b12b041fd2a4b/image.jpg",
    },
  ];

  await artificialDelay();

  return properties;
};

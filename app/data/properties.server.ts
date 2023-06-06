import { PropertyDetail, PropertySummary } from "~/models/properties";

type System = {
  id: string;
};

type PropertyBaseQuery = {
  sys: System;
  title: string;
  price: number;
  image: {
    url: string;
  };
  bedrooms: number;
  bathrooms: number;
};

type PropertySummaryQuery = PropertyBaseQuery & {
  summary: string;
};

type PropertyDetailQuery = PropertyBaseQuery & {
  description: string;
  estateAgent: {
    name: string;
    quote: string;
    email: string;
  };
};

const fetchContent = async <T>(body: string): Promise<T> => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/q01urmjqhd08`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: body,
      }),
    }
  );
  const { data }: { data: T } = await response.json();
  return data;
};

export const getProperties = async () => {
  const result = await fetchContent<{
    propertyCollection: { items: PropertySummaryQuery[] };
  }>(`
  {
    propertyCollection {
      items {
        sys {
          id
        }
        title
        price
        summary
        bedrooms
        bathrooms
        image {
          url
        }
      }
    }
  }
      `);

  return result.propertyCollection.items.map<PropertySummary>(
    ({ sys, image, ...rest }) => ({
      ...rest,
      id: sys.id,
      image: image.url + "?fm=webp&w=600&h=600&fit=scale",
    })
  );
};

export const getProperty = async (id: string) => {
  const result = await fetchContent<{
    property: PropertyDetailQuery;
  }>(`
    {
      property(id: "${id}") {
        sys {
          id
        }
        title
        price
        description
        bedrooms
        bathrooms
        image {
          url
        }
        estateAgent {
          name
          quote
          email
        }
      }
    }
        `);

  const { sys, image, ...rest } = result.property;
  const propertySummary: PropertyDetail = {
    ...rest,
    id: sys.id,
    image: image.url + "?fm=webp&w=1200&h=1200&fit=scale",
  };

  return propertySummary;
};

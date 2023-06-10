const { graphql, rest } = require("msw");
const properties = require("./properties");

let favouriteProperties = [];

const handlers = [
  graphql.query("properties", (_, res, ctx) => {
    return res(
      ctx.data({
        propertyCollection: {
          items: properties.map(({ description, estageAgent, ...rest }) => ({
            ...rest,
          })),
        },
      })
    );
  }),

  graphql.query("property", (req, res, ctx) => {
    const { summary, ...rest } = properties.find(
      (property) => property.sys.id === req.variables.id
    );

    return res(
      ctx.data({
        property: rest,
      })
    );
  }),

  rest.post("https://*.kv.vercel-storage.com/", async (req, res, ctx) => {
    const [method, _, body] = await req.json();

    let result = null;

    switch (method) {
      case "exists":
        result = 0;
        break;
      case "get":
        result = Buffer.from(JSON.stringify({ favouriteProperties })).toString(
          "base64"
        );
        break;
      case "set":
        const data = JSON.parse(body);
        favouriteProperties = data.favouriteProperties;
        result = "OK";
        break;
    }

    return res(
      ctx.json({
        result,
      })
    );
  }),
];

module.exports = handlers;

const { graphql } = require("msw");
const properties = require("./properties");

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
];

module.exports = handlers;

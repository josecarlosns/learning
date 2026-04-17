import { buildSchema } from "graphql";

const graphqlSchema = buildSchema(`
  type TestData {
    text: String!
    views: Int!
  }
  
  type RootQuery {
    hello: TestData
  }
  
  schema {
    query: RootQuery
  }
`);

export { graphqlSchema };

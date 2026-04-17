import { buildSchema } from "graphql";

const graphqlSchema = buildSchema(`  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
  }

  type AuthData {
    token: String!
    userId: String!
  }
  
  type RootMutation {
    createUser(userInput: CreateUserInput): User!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
  }
  
  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);

export { graphqlSchema };

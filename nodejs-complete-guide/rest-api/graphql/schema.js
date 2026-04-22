import { buildSchema } from "graphql";

const graphqlSchema = buildSchema(`  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    imageUrl: String!
  }

  input UpdatePostInput {
    title: String
    content: String
    imageUrl: String
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String
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

  type GetPostData {
    posts: [Post!]!
    totalPosts: Int!
  }
  
  type RootMutation {
    createUser(userInput: CreateUserInput): User!
    createPost(postInput: CreatePostInput): Post!
    updatePost(id: ID!, updatePostInput: UpdatePostInput): Post!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts(page: Int, limit: Int): GetPostData!
    post(id: ID!): Post!
  }
  
  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);

export { graphqlSchema };

const graphqlResolver = {
  hello: () => {
    return {
      text: "Hello world!",
      views: 100,
    };
  },
};

export { graphqlResolver };

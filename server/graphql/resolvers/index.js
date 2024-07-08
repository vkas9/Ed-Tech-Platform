const User = require("../../models/User");

const resolvers = {
  Query: {
    userDetail: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    userById: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user");
      }
    },
  },
};

module.exports = resolvers;

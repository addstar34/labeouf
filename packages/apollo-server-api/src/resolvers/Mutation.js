const resolvers = {
  Mutation: {
    createDraft(root, args, context) {
      return context.prisma.createPost(
        {
          title: args.title,
          author: {
            connect: { id: args.userId }
          }
        },

      )
    },
    publish(root, args, context) {
      return context.prisma.updatePost(
        {
          where: { id: args.postId },
          data: { published: true },
        },

      )
    },
    createUser(root, args, context) {
      return context.prisma.createUser(
        { name: args.name },
      )
    },
    createTodo(root, args, context) {
      console.log('createTodo called')
      return context.prisma.createTodo(
        {
          title: args.title,
          description: args.description,
          start: args.start
        },
      )
    }
  },
}

module.exports = resolvers;
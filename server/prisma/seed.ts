  import { PrismaClient } from '@prisma/client'
  const prisma = new PrismaClient()
  async function main() {
    const monstera = await prisma.product.upsert({
        where: {
            name: 'Monstera'
        },
        update: {},
        create: {
            name: 'Monstera',
            price: 15,
            description: 'Nice plant',
            picture: 'https://images.unsplash.com/photo-1682415423097-76c5c6b0645e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
        },
    })
    const mix = await prisma.product.upsert({
        where: {
            name: 'Mix of small plants'
        },
        update: {},
        create: {
            name: 'Mix of small plants',
            price: 20,
            description: 'Nice plants',
            picture: 'https://images.unsplash.com/photo-1680677463591-f79bee663e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80'
        },  
})
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
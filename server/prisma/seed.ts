import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  //categories
  const interior_plants = await prisma.category.upsert({
    where: {
      categoryName: "Interior plants",
    },
    update: {},
    create: {
      id: 1,
      categoryName: "Interior plants",
    },
  });
  const cactuses = await prisma.category.upsert({
    where: {
      categoryName: "Cactuses",
    },
    update: {},
    create: {
      id: 2,
      categoryName: "Cactuses",
    },
  });
  const mixes = await prisma.category.upsert({
    where: {
      categoryName: "Mixes",
    },
    update: {},
    create: {
      id: 3,
      categoryName: "Mixes",
    },
  });
  const tools = await prisma.category.upsert({
    where: {
      categoryName: "Tools",
    },
    update: {},
    create: {
      id: 4,
      categoryName: "Tools",
    },
  });
  //products
  const monstera = await prisma.product.upsert({
    where: {
      name: "Monstera",
    },
    update: {},
    create: {
      name: "Monstera",
      price: 15,
      description:
        "Meet Monstera, the fierce but fabulous foliage that's sure to turn heads. This funky friend is equal parts playful and stylish, with oversized leaves that add a pop of personality to any room. Just don't be surprised if you find yourself giving it a little wink and a nod every time you walk by.",
      picture:
        "https://images.unsplash.com/photo-1682415423097-76c5c6b0645e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
      categoryId: 1,
    },
  });
  const mix_0 = await prisma.product.upsert({
    where: {
      name: "Living room mix 1",
    },
    update: {},
    create: {
      name: "Living room mix 1",
      price: 70,
      description:
        "Our green squad is here to bring a jungle vibe to your living room! Get ready to party with Spatifilum, Snake Plant and two surprise guests. These plants are committed to making your space look stunning and causing some serious plant envy!",
      picture:
        "https://images.unsplash.com/photo-1680677463591-f79bee663e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80",
      categoryId: 3,
    },
  });
  const mix_1 = await prisma.product.upsert({
    where: {
      name: "Living room mix 2",
    },
    update: {},
    create: {
      name: "Living room mix 2",
      price: 83.5,
      description:
        "Introducing the fabulous foursome of greenery! The Monstera-mashup, Aloha Aloe, and their sidekicks, the Fern-tastic and Pothos-pals. With this crew of lush and lovely plants, your living room will be the talk of the town.",
      picture:
        "https://images.unsplash.com/photo-1680677463305-ba6c258adf03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 3,
    },
  });
  const mix_2 = await prisma.product.upsert({
    where: {
      name: "Living room mix 3",
    },
    update: {},
    create: {
      name: "Living room mix 3",
      price: 35,
      description:
        "Our basic mix pack features the easygoing Snake Plant, the soothing Aloe, the low-maintenance Succulent, and one random surprise guest to help bring some green into your life. Perfect for new plant parents looking to spruce up their space.",
      picture:
        "https://images.unsplash.com/photo-1668584065677-5e59a2fc48d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      categoryId: 3,
    },
  });
  const mix_3 = await prisma.product.upsert({
    where: {
      name: "Mix of small plants 1",
    },
    update: {},
    create: {
      name: "Mix of small plants 1",
      price: 20,
      description:
        "Say hello to our mini-jungle. These little green wonders are big on personality and are sure to bring a smile to your face every time you see them.",
      picture:
        "https://images.unsplash.com/photo-1680675350096-c54e3d733209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      categoryId: 3,
    },
  });
  const mix_4 = await prisma.product.upsert({
    where: {
      name: "Mix of small plants 2",
    },
    update: {},
    create: {
      name: "Mix of small plants 2",
      price: 20,
      description:
        "Introducing our garden squad, a mix of botanical beauties that are ready to liven up your space. It's time to bring the garden indoors with these delightfully diverse plants.",
      picture:
        "https://images.unsplash.com/photo-1659683705445-462189a7d2f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 3,
    },
  });
  const mix_5 = await prisma.product.upsert({
    where: {
      name: "Mix of small plants 3",
    },
    update: {},
    create: {
      name: "Mix of small plants 3",
      price: 17,
      description:
        "Looking for a mini garden that's big on charm? Our trio of Calathea and two other random beauties is here to help! These charming small green plants are perfect for adding a touch of nature to your space.",
      picture:
        "https://images.unsplash.com/photo-1659683705051-ed9ad9dd15b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 3,
    },
  });
  const schefflera = await prisma.product.upsert({
    where: {
      name: "Schefflera",
    },
    update: {},
    create: {
      name: "Schefflera",
      price: 18,
      description:
        "Meet Schefflera, the ultimate foliage friend! With its vibrant green leaves and happy-go-lucky attitude, this plant is sure to bring a smile to your face and a little bit of the great outdoors into your home.",
      picture:
        "https://images.unsplash.com/photo-1659348447568-d0de3cb5a872?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 1,
    },
  });
  const snake = await prisma.product.upsert({
    where: {
      name: "Snake Plant",
    },
    update: {},
    create: {
      name: "Snake Plant",
      price: 25,
      description:
        "Introducing the sleek and stylish Snake Plant! With its tall and striking leaves, this plant is the perfect complement to any modern decor. Not only does it look great, but it also purifies the air and is low-maintenance, making it the ideal choice for any busy plant parent.",
      picture:
        "https://images.unsplash.com/photo-1658309834130-e6234acdf154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 1,
    },
  });
  const pothos = await prisma.product.upsert({
    where: {
      name: "Pothos",
    },
    update: {},
    create: {
      name: "Pothos",
      price: 33.5,
      description:
        "Meet the charming and versatile Pothos plant! This popular houseplant is loved for its lush foliage and easy care. With its cascading vines and heart-shaped leaves, it is the perfect addition to any room in your home. Not only is the Pothos beautiful to look at, it also helps purify the air by removing harmful toxins. ",
      picture:
        "https://images.unsplash.com/photo-1655382277815-a109943ead8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      categoryId: 1,
    },
  });
  const yukka = await prisma.product.upsert({
    where: {
      name: "Yukka",
    },
    update: {},
    create: {
      name: "Yukka",
      price: 42,
      description:
        "Known for its sword-like leaves and tall, spiky appearance, the Yucca adds a unique touch to any room. Its compact size and ability to withstand drought make it a great option for small spaces or busy lifestyles.",
      picture:
        "https://images.unsplash.com/photo-1648650178764-ee8b31b9cfb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 1,
    },
  });
  const ficus = await prisma.product.upsert({
    where: {
      name: "Ficus Elastica",
    },
    update: {},
    create: {
      name: "Ficus Elastica",
      price: 42,
      description:
        "Meet our tall drink of water - the Ficus Tower! This tree is so big, it needs its own postcode. It's perfect for anyone who wants to bring a touch of nature into their lives... and their neighbor's too!",
      picture:
        "https://images.unsplash.com/photo-1646667342847-0e53b32efd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 1,
    },
  });
  const euphorbia = await prisma.product.upsert({
    where: {
      name: "Euphorbia",
    },
    update: {},
    create: {
      name: "Euphorbia",
      price: 95,
      description:
        "Our Euphorbia cactus is not just any ordinary houseplant - it's a statement piece! This big and beautiful cactus will take your breath away with its size and striking presence. It's sure to be the talk of your plant collection and the envy of all your friends.",
      picture:
        "https://images.unsplash.com/photo-1599836749379-8e415b941518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      categoryId: 2,
    },
  });
  const cactuses_mix = await prisma.product.upsert({
    where: {
      name: "Small Cactus",
    },
    update: {},
    create: {
      name: "Small Cactus",
      price: 4.7,
      description:
        "Our collection of small cactuses is perfect for adding a touch of desert beauty to any space. Shape and texture of cactus will be chosen randomly to keep things interesting. Whether you're decorating your desk, shelf, or windowsill, these little guys will steal the show.",
      picture:
        "https://images.unsplash.com/photo-1619446477695-5c4e31d15009?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 2,
    },
  });
  const myrtillocactus = await prisma.product.upsert({
    where: {
      name: "Myrtillo Cactus",
    },
    update: {},
    create: {
      name: "Myrtillo Cactus",
      price: 20,
      description:
        "Myrtillo Cactus is a petite and charming plant that will add a touch of whimsy to any space. Shop now and bring home your new favorite succulent.",
      picture:
        "https://images.unsplash.com/photo-1598531403040-f0683038d916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 2,
    },
  });
  const soil = await prisma.product.upsert({
    where: {
      name: "Soil and Fertilizer Kit",
    },
    update: {},
    create: {
      name: "Soil and Fertilizer Kit",
      price: 39.5,
      description:
        "Our Soil and Fertilizer Kit provides everything you need to nourish your plants and promote healthy growth. Included is a premium blend of nutrient-rich soil and fertilizers to ensure your garden thrives. Perfect for both indoor and outdoor plants.",
      picture:
        "https://images.unsplash.com/photo-1637500980709-6e65a6c2418a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 4,
    },
  });
  const spray = await prisma.product.upsert({
    where: {
      name: "Spray Bottle",
    },
    update: {},
    create: {
      name: "Spray Bottle",
      price: 9.5,
      description:
        "Our adorable spray bottle is the perfect tool to keep your indoor plants hydrated and happy. With a sleek design and easy-to-use nozzle, you'll love spritzing your green friends with just the right amount of moisture.",
      picture:
        "https://images.unsplash.com/photo-1683559085999-f7c03937afea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      categoryId: 4,
    },
  });
  const pots_set = await prisma.product.upsert({
    where: {
      name: "Set of pots Medium",
    },
    update: {},
    create: {
      name: "Set of pots Medium",
      price: 19.5,
      description:
        "Introducing our charming set of three medium-sized pots, perfect for adding a touch of greenery to any space. Made from high-quality materials and featuring a delightful design, these pots are sure to make your plants look their best.",
      picture:
        "https://images.unsplash.com/photo-1684936126781-c449fe06c3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      categoryId: 4,
    },
  });
  const small_pots_set = await prisma.product.upsert({
    where: {
      name: "Set of pots Small",
    },
    update: {},
    create: {
      name: "Set of pots Small",
      price: 14.5,
      description:
        "Add some whimsy to your indoor garden with our adorable set of three small pots. Made with care and featuring a playful design, these pots are perfect for displaying your favorite succulents or herbs. Order now and brighten up your space!",
      picture:
        "https://images.unsplash.com/photo-1683632711664-e14f9f8fe35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      categoryId: 4,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

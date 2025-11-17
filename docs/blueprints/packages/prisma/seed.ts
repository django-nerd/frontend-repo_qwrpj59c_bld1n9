import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cat = await prisma.category.create({ data: { name: 'Flower', slug: 'flower' } })
  for (let i = 1; i <= 10; i++) {
    await prisma.product.create({
      data: {
        name: `Sample Product ${i}`,
        slug: `sample-product-${i}`,
        type: 'flower',
        price: 29.99,
        sku: `SKU-${i}`,
        stock: 100,
        categoryId: cat.id,
        images: { create: [{ url: 'https://picsum.photos/seed/' + i + '/600/600', alt: 'Product image' }] },
        coas: { create: [{ url: 'https://example.com/coa.pdf', lab: 'Third-Party Lab' }] }
      }
    })
  }
  const author1 = await prisma.author.create({ data: { name: 'Dr. Jane Expert', bio: 'Pharmacology PhD', credentials: 'PhD' } })
  await prisma.blogPost.createMany({ data: [
    { slug: 'benefits-of-cbd', title: 'Benefits of CBD', content: 'Content with citations', publishedAt: new Date(), authorId: author1.id },
    { slug: 'how-to-dose-edibles', title: 'How to Dose Edibles', content: 'Start low, go slow', publishedAt: new Date(), authorId: author1.id },
    { slug: 'understanding-coas', title: 'Understanding COAs', content: 'What to look for in lab reports', publishedAt: new Date(), authorId: author1.id }
  ] })
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })

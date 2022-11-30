import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.user.findFirst({ 
                    include: { 
                        category: true, 
                        unit: true
                     },
                        where:{
                            id:req.query.id
                        } 
                    });
                prisma.$disconnect();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.user.update({
                    where:{
                        id:req.query.id
                    },
                    data: {
                        username: req.body.name,
                        Fname: req.body.name,
                        Lname: req.body.name,
                        tel: req.body.name,
                        password: req.body.name
                    }
                })
                prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'DELETE':
            try {
                 await prisma.user.delete({ 
                        where:{
                            id:req.query.id
                        } 
                    });
                prisma.$disconnect();
                res.status(204).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

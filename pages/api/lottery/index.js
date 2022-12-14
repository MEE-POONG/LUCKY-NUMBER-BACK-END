import { PrismaClient } from "@prisma/client"
import { TRUE } from "sass"
const prisma = new PrismaClient()

export default async function handler(req, res) {

    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.lottery.findMany({ include: { lottotype: true } });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.lottery.create({
                    data: {
                        lottotypeId: req.body.lottotypeId,
                        numberlotto: req.body.numberlotto,
                        price: parseInt(req.body.price),
                    }   
                })
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

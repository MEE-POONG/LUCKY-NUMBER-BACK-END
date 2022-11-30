import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.contact.findMany({
                    where: {
                        id: req.query.id
                    }
                });

                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.contact.update({
                    where : {
                        id: req.body.id
                    },
                    data: {
                        titleName: req.body.titleName,
                        address: req.body.address,
                        tel: req.body.tel,
                        opentime: req.body.opentime,
                        line: req.body.line,
                        titleOpenDate: req.body.titleOpenDate,
                    }
                })
                res.status(201).json({ success: true })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

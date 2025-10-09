import { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema"
import prisma from "../../config/prisma";


const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
   const userId = request.userId;


    if(!userId){
         reply.status(401).send({error: "Usuario não autenticado"});

         return;
    }

    const result = createTransactionSchema.safeParse(request.body);
    
    if(!result.success){
        const errorMessage = result.error.issues[0].message || "validação inválida";

        reply.status(400).send({error: errorMessage });
        return;
    }

    const transaction = result.data;

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type,
            },
        });
        if(!category) {
            reply.status(400).send({ error: "Categoria inválida"});
            return;
        }

        const parsedDate = new Date(transaction.date);

        const newTransaction = await prisma.transaction.create({
             data: {
                    ...transaction,
                    date: parsedDate,
                    userId,
                },
            include: {
            category: true,
                },
        });
        reply.status(201).send(newTransaction);
    } catch (err) {
        request.log.error({ err }, "Erro ao criar transação");
        reply.status(500).send({ error: "Erro interno do Servidor"})
    }
}

export default createTransaction;
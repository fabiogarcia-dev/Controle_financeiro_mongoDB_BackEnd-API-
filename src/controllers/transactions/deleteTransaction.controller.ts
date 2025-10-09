import { FastifyReply, FastifyRequest } from "fastify";
import { deleteTransactionParams } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";




export const deleteTransaction = async(
    request: FastifyRequest<{ Params: deleteTransactionParams }>,
    reply: FastifyReply,
): Promise<void> =>{
    const userId = request.userId;
    const { id } = request.params;
    if(!userId){
         reply.status(401).send({error: "Usuario não autenticado"});

         return;
    }

    try {
        
        const transaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if(!transaction){
            reply.status(400).send({ error: "ID da transação inválida" });
            return;
        }
        await prisma.transaction.delete({ where: { id }});

        reply.status(200).send({ message: "Transação deletada com sucesso" });
    } catch (err) {
        request.log.error({ message: " Erro ao deletar transação" });
        reply.status(500).send({ error: "Erro interno do servidor, falha ao deletar transação"})
        
    }
};
import { FastifyReply, FastifyRequest } from "fastify";
import { getTransactionsQuery } from "../../schemas/transaction.schema";
import { TransactionFilter } from "../../types/transaction.types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import prisma from "../../config/prisma";

dayjs.extend(utc)

export const getTransactions = async(request: FastifyRequest<{Querystring:getTransactionsQuery}>, reply: FastifyReply): Promise<void> =>{
     const userId = "FED$%DF%RDF" //userID => request.userId

    if(!userId){
         reply.status(401).send({error: "Usuario não autenticado"});

         return;
    }
    const {month, categoryId, year, type }  = request.query;

    const filters: TransactionFilter = { userId };
    
    if(month && year){
       const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
       const endDate = dayjs.utc(startDate).endOf("month").toDate();
       filters.date = { gte: startDate, lte: endDate };
    }

    if(type){
        filters.type = type;
    }

    if(categoryId){
        filters.categoryId = categoryId;
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: filters,
            orderBy: {date: "desc"},
            include:{
                category:{
                    select: {
                        color: true,
                        name: true,
                        type: true,
                    },
                },
            },
        });

        reply.send(transactions);
    } catch (err){
        request.log.error("Erro ao trazer trancações");
        reply.status(500).send({error: "Erro do servidor"});
    }
};
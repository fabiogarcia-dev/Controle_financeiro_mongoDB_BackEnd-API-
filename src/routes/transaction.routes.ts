import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema, getTransactionSchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";



const transactionRoutes = async (fastify: FastifyInstance) => {
     //Criação
     fastify.route({
          method: "POST",
          url: "/",
          schema: {
               body: createTransactionSchema,
          },
          handler: createTransaction,
     });  

     //Buscar com Filtros
     fastify.route({
          method: "GET",
          url: "/",
          schema:{
               querystring: getTransactionSchema,
          },
          handler: getTransactions, 
     });
};


export default transactionRoutes;
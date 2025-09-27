import { z } from "zod"
import { ObjectId } from "mongodb"
import { TransactionType } from "@prisma/client"


const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
    description: z.string().min(1,'Descrição obrigatória'),
    amount: z.number().positive("Valor deve ser positivo"),
    date: z.coerce.date({ message: "Data inválida" }),
    categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida",
    }),
    type: z.enum([TransactionType.expense, TransactionType.income],{
        message: "Transação inválida",
    }), 
});

export const getTransactionSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
     type: z.enum([TransactionType.expense, TransactionType.income],{
        message: "Transação inválida",
    }).optional(),
     categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida",
    }).optional(), 
});

export type getTransactionsQuery = z.infer<typeof getTransactionSchema>


import { TransactionType } from "@prisma/client"


export interface TransactionFilter {
    userId: string,
    date?:{
        gte: Date;
        lte: Date;
    },
    type?: TransactionType;
    categoryId?: string;
}

// gte -> Greater Than or Equal -> Maior ou igual.
// lte -> Less Than or Equal -> Menor ou igual.
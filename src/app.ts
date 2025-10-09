import Fastify from "fastify";
import cors from '@fastify/cors'
import type { FastifyInstance } from "fastify"
import routes from "./routes";
import { env } from "./config/env";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";


const app:FastifyInstance = Fastify({
    logger: {
        level: env.NODE_ENV === "dev" ? "info" : "error",
    },
}).withTypeProvider<ZodTypeProvider>();



app.register(cors);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(routes, {prefix: "/api"});

export default app;
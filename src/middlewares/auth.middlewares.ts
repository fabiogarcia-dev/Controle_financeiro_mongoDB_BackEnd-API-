import { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";


declare module "fastify" {
    interface FastifyRequest {
        userId?: string;
    }
}


export const authMiddleware = async( request:FastifyRequest, reply:FastifyReply): Promise<void> => {
    //const authHeader = request.headers.authorization;
    const authHeader = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImU4MWYwNTJhZWYwNDBhOTdjMzlkMjY1MzgxZGU2Y2I0MzRiYzM1ZjMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRsOhYmlvIEdhcmNpYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJMGFWcTFySUhTUWRnQzRPbnRCN2NqcEsxM1RVRXZiczlwRHlid1FhWlBENHFKc2llbD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZXZiaWxscy1lODM1ZSIsImF1ZCI6ImRldmJpbGxzLWU4MzVlIiwiYXV0aF90aW1lIjoxNzU5OTg1MDMyLCJ1c2VyX2lkIjoibXZRRHoyRVg5bGhkRU1Xc2pzVjd0dG1VRE1XMiIsInN1YiI6Im12UUR6MkVYOWxoZEVNV3Nqc1Y3dHRtVURNVzIiLCJpYXQiOjE3NTk5ODUwMzIsImV4cCI6MTc1OTk4ODYzMiwiZW1haWwiOiJmYWJpby50aS5hbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODAxMDA5MDA3MTEzODQ2NTQxOCJdLCJlbWFpbCI6WyJmYWJpby50aS5hbUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.iNlm96REKSiGHbwJWvq9HA0AU932YZfLmLLYuJ3_6xJHalRju9SfEfHuwSuMe1F5knR4PxHfcBvVvJWk2nrqwpMw2WSsPLNCl0nezRTxajpmszpureBgVds6R__AnyeYz_5Rk34XLoZpqrEXyk9th7R3O8DSHDLJbm1yut7V8jLBMMDw6WJxY0kNZWrGKRSJZtDMnFw6Gs77iAEGFcwi37fsBfO4mr9ZouFF69QjkOEC73iW4ZKhlLTB-ld8qqQQVG0lAz-UmvY4fpNsjyaG1y3BZmf83NzYwUNIANjAYmwre8Rav8guFRFNLKmWTAld3t1YtT_SbJokidaH7ePR9w"
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        reply.code(401).send({error: "Token de autorização não fornecido"})
        return
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        request.userId = decodedToken.uid;
    } catch (err) {
        request.log.error("Erro ao verificar token")
        reply.code(401).send({error: "Token inválido ou expirado"});
    };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { ClientRepository } from "@core/repository";
import { onlyNumbers } from "@shared/string";

const clientRepository = new ClientRepository();

export const worker = setupWorker(
  ...[
    http.get("/client", () => {
      const responseData = clientRepository.values();

      return HttpResponse.json([...responseData]);
    }),

    http.get("/client/:cpf", ({ params }) => {
      const { cpf } = params;

      const cpfValue = cpf && onlyNumbers(cpf as string);

      if (!cpfValue) {
        new HttpResponse("Cliente não encontrado", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      const responseData = clientRepository.get(cpfValue as string);

      return HttpResponse.json(responseData);
    }),

    http.post("/client", async ({ request }) => {
      const data = await request.json();

      try {
        clientRepository.set(data);

        return HttpResponse.json(true);
      } catch (e: any) {
        new HttpResponse(e.message, {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }),

    http.put("/client", async ({ request }) => {
      const data = await request.json();

      try {
        clientRepository.set(data);

        return HttpResponse.json(true);
      } catch (e: any) {
        new HttpResponse(e.message, {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }),

    http.delete("/client/:cpf", ({ params }) => {
      const { cpf } = params;

      try {
        const result = clientRepository.delete(cpf as string);

        return HttpResponse.json(result);
      } catch (e: any) {
        new HttpResponse(e.message, {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }),
  ]
);

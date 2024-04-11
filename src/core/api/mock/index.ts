import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { ClientRepository } from "../../repository";

const clientRepository = new ClientRepository();

export const worker = setupWorker(
  ...[
    http.get("/client", () => {
      const responseData = clientRepository.values();

      return HttpResponse.json([...responseData]);
    }),

    http.post("/client", async ({ request }) => {
      const data = await request.json();

      const responseData = clientRepository.set(data);

      return HttpResponse.json(responseData);
    }),

    http.put("/client/", ({ request }) => {
      const data = request.json();

      const responseData = clientRepository.set(data);

      return HttpResponse.json(responseData);
    }),

    http.delete("/client/:cpf", ({ params }) => {
      const { cpf } = params;

      const result = clientRepository.delete(cpf as string);

      return HttpResponse.json({
        result,
      });
    }),
  ]
);

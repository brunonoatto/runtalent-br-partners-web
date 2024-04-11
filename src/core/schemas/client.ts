import { z } from "zod";

export const clientSchema = z
  .object({
    cpf: z.string().refine((cpf: string) => {
      if (typeof cpf !== "string") return false;

      cpf = cpf.replace(/[^\d]+/g, "");

      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

      const cpfDigits = cpf.split("").map((el) => +el);

      const rest = (count: number): number => {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) *
            10) %
            11) %
          10
        );
      };

      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
    }, "CPF Inválido."),
    name: z
      .string()
      .min(3, "Mínimo de 3 caracteres.")
      .max(100, "Máximo de 100 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().refine(
      // (value) => /^\([1-9]{2}\) (?:9)([0-9]{4})\-([0-9]{4})$/.test(value),
      (value) => /^[1-9]{2}(?:9)([0-9]{7})$/.test(value),
      "Telefone inválido. (00) 90000-0000"
    ),
  })
  .strict();

export type TClient = z.infer<typeof clientSchema>;

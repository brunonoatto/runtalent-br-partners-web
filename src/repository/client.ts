import { clientSchema, type TClient } from "../schemas";

const clientStorageKey = "clients-storage";

export class ClientRepository extends Map<string, TClient> {
  constructor() {
    super();
    const clientsStorageValue = sessionStorage.getItem(clientStorageKey);

    if (!clientsStorageValue) {
      return;
    }

    try {
      const clientsStorageData: TClient[] = JSON.parse(
        clientsStorageValue
      ) as TClient[];

      for (let i = 0; i < clientsStorageData.length; i++) {
        const parseResult = clientSchema.safeParse(clientsStorageData[i]);

        if (parseResult.success) {
          this.set(parseResult.data.cpf, parseResult.data);
        }
      }
    } catch {
      console.error("Erro ao carregar clientes!");
    }
  }

  private parse(data: unknown) {
    const parseResult = clientSchema.safeParse(data);

    return parseResult;
  }

  private save() {
    const clients = this.values();

    const sessionStorageValue = JSON.stringify(clients);

    sessionStorage.setItem(clientStorageKey, sessionStorageValue);
  }

  set(key: string, value: TClient): this {
    const parseResult = this.parse(value);

    if (parseResult.success) {
      this.set(key, parseResult.data);
    }

    this.save();

    return this;
  }

  delete(key: string): boolean {
    const result = this.delete(key);

    if (result) {
      this.save();
    }

    return result;
  }
}

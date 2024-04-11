import Api from "@core/api";
import type { TClient } from "@core/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["useGetClients"],
    queryFn: async () => {
      const clients = await Api.Client.get();
      return clients;
    },
  });
};

export const useGetClient = () => {
  const [params] = useSearchParams();

  const cpf = params.get("cpf");

  return useQuery({
    enabled: !!cpf,
    queryKey: ["useGetClient", cpf],
    queryFn: async () => {
      if (!cpf) return null;

      const clients = await Api.Client.getClient(cpf);
      return clients;
    },
  });
};

export const usePostClient = () => {
  return useMutation<unknown, unknown, TClient>({
    mutationFn: async (client) => {
      return Api.Client.post(client);
    },
  });
};

export const useUpdateClient = () => {
  return useMutation<unknown, unknown, TClient>({
    mutationFn: async (client) => {
      return Api.Client.update(client);
    },
  });
};

export const useDeleteClient = () => {
  return useMutation<unknown, unknown, string>({
    mutationFn: async (id) => {
      return Api.Client.remove(id);
    },
  });
};

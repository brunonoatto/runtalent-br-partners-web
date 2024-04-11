import Api from "@core/api";
import type { TClient } from "@core/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
  const { cpf: cpfParam } = useParams();

  return useQuery({
    enabled: !!cpfParam,
    queryKey: ["useGetClient", cpfParam],
    queryFn: async () => {
      if (!cpfParam) return null;

      const clients = await Api.Client.getClient(cpfParam);
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

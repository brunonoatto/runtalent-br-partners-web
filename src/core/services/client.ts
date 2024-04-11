import Api from "@core/api";
import type { TClient } from "@core/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["useGetClients"],
    queryFn: Api.Client.get,
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
    mutationFn: Api.Client.post,
  });
};

export const useUpdateClient = () => {
  return useMutation<unknown, unknown, TClient>({
    mutationFn: Api.Client.update,
  });
};

export const useDeleteClient = () => {
  return useMutation<unknown, unknown, string>({
    mutationFn: Api.Client.remove,
  });
};

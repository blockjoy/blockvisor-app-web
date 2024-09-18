export const callPipedriveApi = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT',
  body: Record<string, any> | null = null,
  params: Record<string, any> | null = null,
): Promise<PipedriveResponse> => {
  const response = await window?.fetch('/api/pipedrive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      endpoint,
      method,
      body,
      params,
    }),
  });

  return await response.json();
};

export async function fetchFAQ(): Promise<any> {
  const API_ENDPOINTS = {
    articles: '/articles',
    article: '/article',
  };

  let data: FAQ[] = [];

  const baseURL = `${process.env.CRISP_API_URL}/website/${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}/helpdesk/locale/en`;

  // localStorage.user_session inside CRISP admin
  const token = Buffer.from(
    `${process.env.CRISP_TOKEN_IDENTIFIER}:${process.env.CRISP_TOKEN_KEY}`,
  ).toString('base64');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-Crisp-Tier', 'user');
  headers.append('Authorization', `Basic ${token}`);

  const requestOptions: any = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const requestParams: any = {
    filter_category_id: process.env.CRISP_FAQ_CATEGORY_ID,
  };

  const articlesRequest = await fetch(`${baseURL}${API_ENDPOINTS.articles}/`, {
    ...requestOptions,
    ...requestParams,
  });

  if (!articlesRequest.ok) {
    throw new Error(
      `Error. Fetching all Articles. Status code: ${articlesRequest.status}`,
    );
  }

  const articlesData = await articlesRequest.json();

  const urls = articlesData.data.map(
    (article: any) =>
      `${baseURL}${API_ENDPOINTS.article}/${article.article_id}`,
  );
  const requests = urls.map((url: string) => fetch(url, requestOptions));

  try {
    const responses = await Promise.all(requests);
    const responsesData = await Promise.all(responses.map((res) => res.json()));

    const filteredData = responsesData.filter((rd) => !rd.error);

    data = filteredData.map((fd: any) => fd.data);
  } catch (error) {
    throw new Error(`Error. Fetching single Article: ${error}`);
  }

  return {
    data,
  };
}

const API_ENDPOINTS = {
  articles: '/articles',
  article: '/article',
};

type ResponseData = {
  data: FAQ[];
};

export async function fetchFAQ(): Promise<ResponseData> {
  let data: FAQ[] = [];

  const baseURL: string = `${process.env.CRISP_API_URL}/website/${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}/helpdesk/locale/en`;

  // localStorage.user_session inside CRISP admin
  const token: string = Buffer.from(
    `${process.env.CRISP_TOKEN_IDENTIFIER}:${process.env.CRISP_TOKEN_KEY}`,
  ).toString('base64');

  const headers: HeadersInit = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-Crisp-Tier', 'user');
  headers.append('Authorization', `Basic ${token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const requestParams = new URLSearchParams();
  requestParams.set('filter_category_id', process.env.CRISP_FAQ_CATEGORY_ID!);

  const articlesRequest = await fetch(
    `${baseURL}${API_ENDPOINTS.articles}/?${requestParams}`,
    requestOptions,
  );

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

    // console.log('responsesData', responsesData);

    const filteredData = responsesData.filter(
      (rd: any) => rd.data && !rd.error && rd.data.visibility === 'visible',
    );

    console.log('filteredData', responsesData);

    data = filteredData.map((fd: any) => fd.data);

    console.log('data', data);
  } catch (error) {
    throw new Error(`Error. Fetching single Article: ${error}`);
  }

  return {
    data,
  };
}

export async function webApiCaller(
  method: string,
  route: string, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {}
) {
  const url = generateApiUrl(route, body);

  const options: { method: string; body: string } = {
    body,
    method,
  };

  if (method == "POST") {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(url);
    const response = await fetch(url, options);

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateApiUrl = (endpoint: string, params: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = new URL(`${baseUrl}${endpoint}`);

  Object.keys(params).forEach((key: string) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
};

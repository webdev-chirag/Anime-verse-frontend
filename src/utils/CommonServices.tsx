export async function webApiCaller(
  method: string,
  route: string,
  body: any = {}
) {
  const url = generateApiUrl(route, body);

  let options: any = {
    method,
  };

  if (method == "POST") {
    options.body = JSON.stringify(body);
  }

  try {

    console.log(url)
    const response = await fetch(url, options);

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const generateApiUrl = (endpoint: any, params: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = new URL(`${baseUrl}${endpoint}`);

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
};

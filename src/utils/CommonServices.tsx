export async function webApiCaller(
  method: string,
  route: string, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {}
) {
  const url = generateApiUrl(route, body);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    method,
  };

  if (method == "POST") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const finalResponse = await response?.json();
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
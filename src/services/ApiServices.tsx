import { webApiCaller } from "@/utils/CommonServices";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getTrending(params: any = undefined) {
  try {
    const response = webApiCaller("GET", "/api/v2/trending", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPopuler(params: any) {
  try {
    const response = webApiCaller("GET", "/api/v2/popular", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSearch(params: any) {
  try {
    const response = webApiCaller("GET", "/api/v2/search", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postSearch(params: any) {
  try {
    const response = webApiCaller("POST", "/api/v2/search", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getInfo(Id: any) {
  try {
    const response = webApiCaller("GET", `/api/v2/info/${Id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEpisodes(Id: any) {
  try {
    const response = webApiCaller("GET", `/api/v2/episodes/${Id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEpisode(Id: any, ep: any) {
  try {
    const response = webApiCaller("GET", `/api/v2/stream/${Id}/${ep}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRecommendations(id: any, params: any) {
  try {
    const response = webApiCaller(
      "GET",
      `/api/v2/recommendations/${id}`,
      params
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

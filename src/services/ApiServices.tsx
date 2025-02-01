import { webApiCaller } from "@/utils/CommonServices";

export async function getTrending(params: any = undefined) {
  try {
    const response = webApiCaller("GET", "/api/v2/trending", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function getPopuler(params: any) {
  try {
    const response = webApiCaller("GET", "/api/v2/popular", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getSearch(params: any) {
  try {
    const response = webApiCaller("GET", "/api/v2/search", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function postSearch(params: any) {
  try {
    const response = webApiCaller("POST", "/api/v2/search", params);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function getInfo(Id: any) {
  try {
    const response = webApiCaller("GET", `/api/v2/info/${Id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

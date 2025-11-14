"use server";

const BASE_URL = process.env.API_URL || "http://localhost:8000/v1";

async function createHeaders(customHeaders: HeadersInit = {}, body?: unknown) {
	const headers = new Headers(customHeaders);

	if (!headers.has("Content-Type") && !(body instanceof FormData)) {
		headers.set("Content-Type", "application/json");
	}

	return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get("content-type");

	if (!response.ok) {
		const errorData =
			contentType && contentType.includes("application/json")
				? await response.json()
				: await response.text();
		throw new Error(JSON.stringify(errorData));
	}

	if (contentType && contentType.includes("application/json")) {
		return response.json();
	}

	return response.text() as Promise<T>;
}

/**
 * Get request
 * @param endpoint - The endpoint to fetch
 * @param options - The options for the request
 * @returns The response from the request
 */
export async function get<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const headers = await createHeaders(options.headers);
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "GET",
		...options,
		headers,
		cache: options.cache || "no-store",
	});

	return handleResponse<T>(response);
}

/**
 * Post request
 * @param endpoint - The endpoint to fetch
 * @param data - The data to send
 * @param options - The options for the request
 * @returns The response from the request
 */
export async function post<T>(
	endpoint: string,
	data?: unknown,
	options: RequestInit = {}
): Promise<T> {
	const headers = await createHeaders(options.headers, data);
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "POST",
		body: data
			? data instanceof FormData
				? data
				: JSON.stringify(data)
			: undefined,
		...options,
		headers,
		cache: options.cache || "no-store",
	});

	return handleResponse<T>(response);
}

/**
 * Put request
 * @param endpoint - The endpoint to fetch
 * @param data - The data to send
 * @param options - The options for the request
 * @returns The response from the request
 */
export async function put<T>(
	endpoint: string,
	data?: unknown,
	options: RequestInit = {}
): Promise<T> {
	const headers = await createHeaders(options.headers, data);
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "PUT",
		body: data
			? data instanceof FormData
				? data
				: JSON.stringify(data)
			: undefined,
		...options,
		headers,
		cache: options.cache || "no-store",
	});

	return handleResponse<T>(response);
}

/**
 * Delete request
 * @param endpoint - The endpoint to fetch
 * @param options - The options for the request
 * @returns The response from the request
 */
export async function del<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const headers = await createHeaders(options.headers);
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "DELETE",
		...options,
		headers,
		cache: options.cache || "no-store",
	});

	return handleResponse<T>(response);
}

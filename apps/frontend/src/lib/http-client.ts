interface ApiError extends Error {
	status: number;
	statusText: string;
}

export class HttpClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";
	}

	private async createHeaders(customHeaders: HeadersInit = {}, body?: unknown) {
		const headers = new Headers(customHeaders);

		if (!(body instanceof FormData)) {
			if (!headers.has("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}
		}

		// For client-side requests, we'll handle auth differently
		// You can add token management here if needed for client-side auth

		return headers;
	}

	private async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			let errorBody: Record<string, unknown>;
			try {
				errorBody = await response.clone().json();
			} catch {
				try {
					errorBody = { message: await response.clone().text() };
				} catch {
					errorBody = {};
				}
			}

			const errorMessage =
				errorBody?.message || errorBody?.error || response.statusText;

			const error = new Error(`${errorMessage}`) as ApiError;
			error.status = response.status;
			error.statusText = response.statusText;
			throw error;
		}

		// Handle empty responses
		const contentType = response.headers.get("content-type");
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
	async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const headers = await this.createHeaders(options.headers);

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "GET",
			...options,
			headers,
		});

		return this.handleResponse<T>(response);
	}

	/**
	 * Post request
	 * @param endpoint - The endpoint to fetch
	 * @param data - The data to send
	 * @param options - The options for the request
	 * @returns The response from the request
	 */
	async post<T>(
		endpoint: string,
		data?: unknown,
		options: RequestInit = {}
	): Promise<T> {
		const headers = await this.createHeaders(options.headers, data);

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "POST",
			body: data
				? data instanceof FormData
					? data
					: JSON.stringify(data)
				: undefined,
			...options,
			headers,
		});

		return this.handleResponse<T>(response);
	}

	/**
	 * Put request
	 * @param endpoint - The endpoint to fetch
	 * @param data - The data to send
	 * @param options - The options for the request
	 * @returns The response from the request
	 */
	async put<T>(
		endpoint: string,
		data?: unknown,
		options: RequestInit = {}
	): Promise<T> {
		const headers = await this.createHeaders(options.headers, data);

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "PUT",
			body: data
				? data instanceof FormData
					? data
					: JSON.stringify(data)
				: undefined,
			...options,
			headers,
		});

		return this.handleResponse<T>(response);
	}

	/**
	 * Delete request
	 * @param endpoint - The endpoint to fetch
	 * @param options - The options for the request
	 * @returns The response from the request
	 */
	async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const headers = await this.createHeaders(options.headers);

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "DELETE",
			...options,
			headers,
		});

		return this.handleResponse<T>(response);
	}
}

export const httpClient = new HttpClient();

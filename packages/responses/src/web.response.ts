export class WebResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: string;
  pagination?: Pagination;
}
export class Pagination {
  total_items: number;
  current_page: number;
  size: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page: number | null;
  previous_page: number | null;
}

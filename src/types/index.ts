export type ValidationErrors = {
  errors: Record<string, string>;
  message: string;
};

export type Meta = {
  current_page: number;
  per_page: number;
  total: number;
};

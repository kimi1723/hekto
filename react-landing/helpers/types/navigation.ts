import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface Navigation {
  router: AppRouterInstance;
  searchParams: ReadonlyURLSearchParams;
}

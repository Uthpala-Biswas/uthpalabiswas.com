import { POST_QUERYResult } from "@/sanity/types";

type CategoryProps = {
  category: NonNullable<POST_QUERYResult>["category"];
};

export function Category({ category }: CategoryProps) {
  return category ? (
    <span className="bg-orange-300 p-2 rounded">{category?.title}</span>
  ) : null;
}

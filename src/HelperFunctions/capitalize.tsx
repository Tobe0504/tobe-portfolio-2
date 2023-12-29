export const capitalize = (data: string) => {
  if (data) return `${data?.charAt(0)?.toUpperCase()}${data?.slice(1)}`;
};

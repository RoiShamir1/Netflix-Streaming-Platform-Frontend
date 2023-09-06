export const getFilterUrl = (searchFromURI, filter, skipPathName) => {

  const searchParams = new URLSearchParams(searchFromURI);

  const query = searchParams.get("query") || "all";
  const genre = searchParams.get("genre") || "all"

  const filterQuery = filter.query || query;
  const filterGenre = filter.genre || genre;

  const link = `${skipPathName ? "" : "/search?"}genre=${filterGenre}&query=${filterQuery}`;
  return link;
};

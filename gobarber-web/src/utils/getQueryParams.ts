interface QueryData {
  [key: string]: string;
}

export default function getQueryParams(locationSearch: string): QueryData {
  const [removedQuestionMark] = locationSearch
    .split('?')
    .filter((item) => item !== '');

  const parsedQuery = removedQuestionMark.split('&');

  const queryObject: QueryData = {};

  parsedQuery.forEach((param) => {
    const [key, value] = param.split('=');
    queryObject[key] = value;
  });

  return queryObject;
}

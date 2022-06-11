const END_POINT_FEEDS = 'https://segware-book-api.segware.io/api/feeds';

const requestFeeds = async () => {
  const requestFetch = await fetch(END_POINT_FEEDS);
  const requestJson = await requestFetch.json();

  return requestJson;
};

export default requestFeeds;

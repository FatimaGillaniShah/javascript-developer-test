const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  // Create concurrent requests for all URLs
  const requests = urls.map(async (url) => {
    const response = await httpGet(url);
    const body = JSON.parse(response.body);

    // Return success or failure object based on HTTP status
    if (response.status === 200) {
      return { "Arnie Quote": body.message };
    } else {
      return { FAILURE: body.message };
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);
  return results;
};

module.exports = {
  getArnieQuotes,
};

export async function query(gqlQuery) {
  const res = await this.fetch("https://api.crystallize.com/crowur/catalogue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Crystallize-Access-Token-Id": "4aab359c664320d54cc9",
      "X-Crystallize-Access-Token-Secret":
        "e81adeb937b76da67e9d2ba30fdef721267f2e0a",
    },
    body: JSON.stringify({ query: gqlQuery }),
  });
  const json = await res.json();

  return json.data;
}

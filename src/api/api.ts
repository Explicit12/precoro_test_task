export async function sendInveUserInfo(info: object): Promise<Response> {
  return fetch("/api/some-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
}

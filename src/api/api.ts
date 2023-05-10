export async function sendInviteUserInfo(info: object): Promise<Response> {
  console.log(JSON.stringify(info));
  return fetch("/api/some-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
}

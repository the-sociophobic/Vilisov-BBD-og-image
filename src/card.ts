import { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            background: teal;
          }
        </style>
        <body>
          <div class="container">
            <img src="https://sun9-53.userapi.com/c855032/v855032066/234251/DKU1YJ9UibI.jpg" />
            <div class="title">${"нету такой страницы"})[0]}</div>
            <div class="website">apollonia.today/inaroom</div>
          </div>
        </body>
      </html>
    `;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
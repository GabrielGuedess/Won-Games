export function imageConvert(url: string) {
  const image = url.includes('https://res.cloudinary.com/won-games/')
    ? url
    : `http://localhost:1337${url}`;

  return image;
}

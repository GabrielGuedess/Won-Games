export function imageConvert(url: string) {
  const image = url.includes('https://res.cloudinary.com/')
    ? url
    : `${process.env.NEXT_PUBLIC_IMAGE_HOST}${url}`;

  return image;
}

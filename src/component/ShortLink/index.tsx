import { useEffect } from "react";
import { useParams } from "react-router-dom";

function followShortUrl(shortUrl: string): void {
  const apiUrl = `${import.meta.env.VITE_API_URL}/s/${shortUrl}`;

  window.location.href = apiUrl;
}

export const ShortLink = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      followShortUrl(shortUrl);
    }
  }, [shortUrl]);

  return <div>Redirecting...</div>;
};

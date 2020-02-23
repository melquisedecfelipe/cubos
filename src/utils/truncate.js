export default function truncate(string, size) {
  if (string.length > size) {
    return string.slice(0, size) + '...';
  } else {
    return string;
  }
}

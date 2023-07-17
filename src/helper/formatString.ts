export default function formatString(str: string): string {
    if (str.length > 10) {
      return str.substring(0, 10) + "...";
    } else {
      return str;
    }
  }
  
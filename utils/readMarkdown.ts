export function readMarkdown(markdown: string): string {
  let readMarkdown = markdown;

  const imgRegex = /!\[\]\(([^\)]+)\)/g;
  const newLineRegex = /\n/g;
  const boldRegex = /\*\*(.*?)\*\*/g;

  // replace image markdown
  readMarkdown = readMarkdown.replace(imgRegex, '<img src="$1" />');
  // replace new lines
  readMarkdown = readMarkdown.replace(newLineRegex, '<br />');
  // replace bold content
  readMarkdown = readMarkdown.replace(boldRegex, '<strong>$1</strong>');

  return readMarkdown;
}

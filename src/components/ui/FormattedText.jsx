export const FormattedText = ({ text }) => {
  if (typeof text !== 'string') return text;
  
  // Regex to split by backticks or URLs
  const parts = text.split(/(`[^`]+`|https?:\/\/[^\s]+)/);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('http')) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-link">
          {part}
        </a>
      );
    }
    return part;
  });
};

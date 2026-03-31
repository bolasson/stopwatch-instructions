import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

export const CodeBlock = ({ code, hint }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div>
      <div className="code-actions">
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy code'}
        </button>
        {hint && <span className="code-hint">{hint}</span>}
      </div>
      <div className="code-wrap">
        <div className="code-box">
          <SyntaxHighlighter 
            language="cpp" 
            style={vscDarkPlus}
            wrapLines={true}
            lineProps={{
              style: { 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word' 
              }
            }}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
              fontSize: '0.85rem',
              lineHeight: '1.5',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

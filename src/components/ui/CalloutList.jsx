import './CalloutList.css';
import { FormattedText } from './FormattedText';

export const CalloutList = ({ items }) => (
  <ul className="callout-list">
    {items.map((item, index) => (
      <li key={index} className="callout-item">
        {item.header && (
          <strong className="callout-header">
            <FormattedText text={item.header} />:{" "}
          </strong>
        )}
        <span className="callout-body">
          <FormattedText text={item.body || item.content || item} />
        </span>
      </li>
    ))}
  </ul>
);

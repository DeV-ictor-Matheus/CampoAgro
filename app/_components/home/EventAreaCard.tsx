import type { InfoModalContent } from './InfoModal';

type EventAreaCardProps = {
  number: string;
  title: string;
  desc: string;
  tag: string;
  tone: string;
  details: InfoModalContent;
  onOpen: (content: InfoModalContent) => void;
};

export default function EventAreaCard({ number, title, desc, tag, tone, details, onOpen }: EventAreaCardProps) {
  return (
    <article className={`area-flow-item reveal area-card--${tone}`}>
      <span className="area-flow-number">{number}</span>
      <div className="area-flow-copy">
        <span className="area-flow-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <button className="area-details-btn" type="button" onClick={() => onOpen(details)}>
        Ver detalhes
      </button>
    </article>
  );
}

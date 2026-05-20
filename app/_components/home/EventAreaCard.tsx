type EventAreaCardProps = {
  number: string;
  title: string;
  desc: string;
  tag: string;
  tone: string;
};

export default function EventAreaCard({ number, title, desc, tag, tone }: EventAreaCardProps) {
  return (
    <article className={`area-flow-item reveal area-card--${tone}`}>
      <span className="area-flow-number">{number}</span>
      <div className="area-flow-copy">
        <span className="area-flow-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </article>
  );
}


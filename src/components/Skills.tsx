type SkillsProps = {
  items?: string[];
};

export default function Skills({ items = [] }: SkillsProps) {
  return (
    <div className="chips">
      {items.map((s) => (
        <span key={s} className="chip">
          {s}
        </span>
      ))}
    </div>
  );
}
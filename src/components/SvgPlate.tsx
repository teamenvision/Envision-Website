export function SvgPlate({
  left,
  right,
  name,
  location
}: {
  left: string;
  right: string;
  name: string;
  location: string;
}) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="240" height="60" rx="10" fill="#222" stroke="#ffcb00" strokeWidth="2" />
      <text x="20" y="30" fontSize="16" fill="#ffcb00" fontFamily="Courier New" alignmentBaseline="middle">
        {left}
      </text>
      <text x="120" y="25" fontSize="16" fill="#fff" fontFamily="Arial" textAnchor="middle">
        {name}
      </text>
      <text x="120" y="45" fontSize="12" fill="#ccc" fontFamily="Arial" textAnchor="middle">
        {location}
      </text>
      <text x="220" y="30" fontSize="16" fill="#ffcb00" fontFamily="Courier New" alignmentBaseline="middle" textAnchor="end">
        {right}
      </text>
    </svg>
  );
}

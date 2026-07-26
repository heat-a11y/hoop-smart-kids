export default function SightLines({
  fromX,
  fromY,
  target1X,
  target1Y,
  target2X,
  target2Y,
  color = '#00D4FF',
  opacity = 0.3,
  label,
  labelEn,
  labelZh,
  lang = 'en',
  animate = true,
}) {
  return (
    <g>
      {/* Vision triangle fill */}
      <path
        d={`M ${fromX} ${fromY} L ${target1X} ${target1Y} L ${target2X} ${target2Y} Z`}
        fill={color}
        opacity={opacity}
        className={animate ? 'animate-pulse' : ''}
      />

      {/* Sight line 1 */}
      <line
        x1={fromX}
        y1={fromY}
        x2={target1X}
        y2={target1Y}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6,3"
        opacity="0.6"
      />
      {/* Sight line 2 */}
      <line
        x1={fromX}
        y1={fromY}
        x2={target2X}
        y2={target2Y}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6,3"
        opacity="0.6"
      />

      {/* Small dot at targets */}
      <circle cx={target1X} cy={target1Y} r="3" fill={color} opacity="0.8" />
      <circle cx={target2X} cy={target2Y} r="3" fill={color} opacity="0.8" />

      {/* Label */}
      {(label || labelEn) && (
        <text
          x={(fromX + target1X + target2X) / 3}
          y={(fromY + target1Y + target2Y) / 3 + 4}
          textAnchor="middle"
          fill={color}
          fontSize="8"
          fontWeight="bold"
          opacity="0.8"
        >
          {label || (lang === 'en' ? labelEn : labelZh)}
        </text>
      )}
    </g>
  );
}

interface BadgeProps {
  count: number;
}

const Badge = ({ count }: BadgeProps) => {
  if (count === 0) return null;
  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default Badge;
export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "large" }) {
  return (
    <div
      className={`${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      } relative mr-2 inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600 `}
    >
      <span className={`${size === "small" ? "text-sm" : "text-lg"} font-medium text-gray-600 dark:text-gray-300`}>
        {name[0] || "A"}
      </span>
    </div>
  );
}

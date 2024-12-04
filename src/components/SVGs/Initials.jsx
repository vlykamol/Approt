
const colors = [
  "#3498db", // Light blue
  "#2ecc71", // Green
  "#9b59b6", // Purple
  "#e74c3c", // Red
  "#1abc9c", // Turquoise
  "#34495e", // Dark Blue-Grey
  "#f39c12", // Orange
  "#e67e22", // Carrot Orange
  "#16a085", // Dark Turquoise
  "#2980b9", // Deep Blue
]
export default function InitialsIcon  ({ name, size = 22, textColor = "#ffffff" }) {
  const idx = Math.floor(Math.random() * colors.length)
  const bgColor = colors[idx]
  const getInitials = (name) => {
    if (!name) return "NA";
    const words = name.trim().split(" ");
    const initials = words.map((word) => word[0].toUpperCase()).slice(0, 2);
    return initials.join("");
  };

  const initials = getInitials(name);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: `${size / 2.5}px`,
        fontWeight: "bold",
        textTransform: "uppercase",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
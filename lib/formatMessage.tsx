export function formatMessage(content: string) {
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    if (
      line.startsWith("Morning") ||
      line.startsWith("Afternoon") ||
      line.startsWith("Evening")
    ) {
      let emoji = "";
      if (line.startsWith("Morning")) emoji = "🌅 ";
      else if (line.startsWith("Afternoon")) emoji = "☀️ ";
      else if (line.startsWith("Evening")) emoji = "🌙 ";

      return (
        <p key={idx} className="mt-4 font-bold text-lg text-white">
          {emoji}
          {line.trim()}
        </p>
      );
    } else if (line.startsWith("- Visit:")) {
      return (
        <p key={idx}>
          <span className="font-semibold text-white">🗺️ Visit: </span>
          {line.replace("- Visit:", "").trim()}
        </p>
      );
    } else if (line.startsWith("- Eat:")) {
      return (
        <p key={idx}>
          <span className="font-semibold text-white">🍽️ Eat: </span>
          {line.replace("- Eat:", "").trim()}
        </p>
      );
    } else {
      return <p key={idx}>{line}</p>;
    }
  });
}

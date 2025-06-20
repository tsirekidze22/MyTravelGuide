export function formatMessage(content: string) {
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    // SECTION HEADERS
    if (
      trimmed.startsWith("Morning") ||
      trimmed.startsWith("Afternoon") ||
      trimmed.startsWith("Evening")
    ) {
      let emoji = "";
      if (trimmed.startsWith("Morning")) emoji = "🌅 ";
      else if (trimmed.startsWith("Afternoon")) emoji = "☀️ ";
      else if (trimmed.startsWith("Evening")) emoji = "🌙 ";

      return (
        <p key={idx} className="mt-6 font-bold text-lg text-white mb-2">
          {emoji}
          {trimmed}
        </p>
      );
    }

    // SUBSECTION HEADINGS: Visit / Eat
    if (trimmed.startsWith("🗺️ Visit:") || trimmed.startsWith("🍽️ Eat:")) {
      return (
        <p key={idx} className="mt-3 font-semibold text-white">
          {trimmed}
        </p>
      );
    }

    // BULLET POINTS
    if (trimmed.startsWith("•")) {
      return (
        <p key={idx} className="ml-6 text-white">
          <span className="mr-2">•</span>
          {trimmed.replace("•", "").trim()}
        </p>
      );
    }

    // FALLBACK
    return (
      <p key={idx} className="font-thin text-white">
        {trimmed}
      </p>
    );
  });
}

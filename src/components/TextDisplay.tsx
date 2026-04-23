type Props = {
  text: string;   // The full reference text the user should type
  input: string;  // The user's current typed input
};

export const TextDisplay = ({ text, input }: Props) => {
  return (
    <p className="text-display">
      {text.split("").map((char, index) => {
        let className = ""; // Default: no styling

        // If the user has typed this far, compare characters
        if (index < input.length) {
          className =
            char === input[index]
              ? "correct"   // Character matches user input
              : "incorrect"; // Character does not match
        }

        // Render each character in its own span
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </p>
  );
};
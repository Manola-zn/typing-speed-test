type Props = {
  input: string; // Current value of the textarea (what the user has typed)
  setInput: (val: string) => void; // Function to update the input state
  disabled: boolean; // Whether the textarea is disabled (e.g., when test ends)
};

export const TypingBox = ({ input, setInput, disabled }: Props) => {
  return (
    <textarea
      value={input} // Controlled component: value comes from state
      onChange={(e) => setInput(e.target.value)} // Update state on user input
      disabled={disabled} // Disable typing when needed
      placeholder="Start typing..." // Hint shown when input is empty
    />
  );
};
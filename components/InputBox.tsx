type InputBoxProps = {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  isLoading: boolean;
};

export default function InputBox({
  input,
  setInput,
  handleSend,
  isLoading,
}: InputBoxProps) {
  return (
    <div className="mt-6 w-full max-w-3xl border-t border-gray-700 bg-[#212121] p-4 rounded-xl">
      <div className="flex gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={3}
          placeholder="Plan my day in Tbilisi, Georgia..."
          className="flex-1 resize-none px-4 py-3 rounded-xl bg-[#2c2c2c] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";

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
      <div className="flex items-center gap-4">
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
          className="p-3.5 cursor-pointer rounded-full 
            transition-all duration-200 disabled:opacity-50 button-3d"
          style={{
            height: 60,
            width: 60,
          }}
        >
          <Image
            src={"/assets/icons/arrow-top.svg"}
            width={70}
            height={70}
            alt="arrow-top"
          />
        </button>
      </div>
    </div>
  );
}

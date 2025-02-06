import { useCallback, useState } from "react";

const API_URL = "http://localhost:8000";

const fetchSuggestions = async (query: string) => {
  const response = await fetch(`${API_URL}/autocomplete?query=${query}&size=5`);
  const data = await response.json();

  return data.suggestions;
};

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleFetchSuggestions = async (query: string) => {
    const suggestions = await fetchSuggestions(query);
    setSuggestions(suggestions || []);
  };

  const handleFetchDebounced = useCallback(
    debounce(handleFetchSuggestions, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setInput(query);

    handleFetchDebounced(query);
  };

  return (
    <div>
      <div>
        Search: <input type="text" value={input} onChange={handleInputChange} />
      </div>

      <h2>Suggestions</h2>

      {!suggestions.length && <p>No suggestions.</p>}

      {suggestions.length > 0 ? (
        <ul>
          {suggestions?.map((suggestion: string) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default App;

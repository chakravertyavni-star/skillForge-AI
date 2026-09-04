import Icon from './Icon';
import './SearchInput.css';

function SearchInput({ value, onChange, placeholder = 'Search…', label }) {
  return (
    <div className="search-input">
      <Icon name="search" size={16} />
      <input
        className="input"
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={label || placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchInput;

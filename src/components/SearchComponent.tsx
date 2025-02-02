import React, { ChangeEvent, useState } from 'react';
import './../styles/searchBar.css'; // Make sure to create and import the corresponding CSS file for styling


// Stop search temporarily

const suggestions = [
  "Modules management", "Users Management", "Courses management", "Chapters Management", "Quizzes Management",
  "Add new Module", "Add new User", "Add new course", "Add new chapter", "Add new Quiz",
  "Update Module", "Update User", "Update course", "Update chapter", "Update Quiz",
  "Remove Module", "Remove User", "Remove course", "Remove chapter", "Remove Quiz"
];

  const SearchComponent: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const userData = event.target.value;
      setSearchText(userData);
  
      if (userData) {
        const filteredData = suggestions.filter((data) =>
          data.toLowerCase().startsWith(userData.toLowerCase())
        );
        setFilteredSuggestions(filteredData);
      } else {
        setFilteredSuggestions([]);
      }
    };
  
    const selectSuggestion = (suggestion: string) => {
      setSearchText(suggestion);
      setFilteredSuggestions([]);
    };
  
    return <></> ;
    (
      <div className="container relative h-10">
        <div className={`searchInput m-1 z-10 ${filteredSuggestions.length > 0 ? 'active' : ''}`}>
          <input 
            id="srch"
            name="srch"
            type="text" 
            placeholder="Saisir une adresse.." 
            value={searchText} 
            onChange={handleInputChange} 
            className='h-10 '
          />
          <div className="resultBox absolute bg-white w-full">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => selectSuggestion(suggestion)}>
                {suggestion}
              </li>
            ))}
          </div>
          <div className="icon p-1">
            <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchComponent;
import React, { useState } from 'react';

function SortDropdown({ items, onSelectItem, activeSortType }) {
  const [visiblePopup, setVisiblePopup] = useState(false);

  const handleSortType = (item) => {
    onSelectItem(item.type);
    setVisiblePopup(!visiblePopup);
  };

  return (
    <div className="custom-select">
      <div
        className="custom-select__top"
        onClick={() => setVisiblePopup(!visiblePopup)}
      >
        Сортировать по:
      </div>
      {visiblePopup && (
        <div className="custom-select__dropdown">
          <ul className="custom-select__list">
            {items &&
              items.map((item, index) => (
                <li
                  className={`custom-select__item ${
                    item.type === activeSortType ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => handleSortType(item)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;

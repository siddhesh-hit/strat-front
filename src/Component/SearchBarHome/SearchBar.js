import React from "react";
import "./SearchBar.css";
function SearchBar() {
  return (
    <div>
      <div class="styles_searchContainer__BMCIH tw-text-t-black-50 tw-bg-white tw-border-gray-20 tw-border | tw-flex tw-items-center tw-justify-center | tw-pr-5 | tw-h-12">
        <button
          data-cy="search-button"
          class="styles_actionButton__7eSIr tw-flex tw-justify-center tw-items-center | tw-px-4 | tw-h-full">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search">
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <input placeholder="Search content types like Facebook Ads, Blog ideas, SEO..." data-cy="search-input"
          class="tw-flex-1 | tw-h-full tw-w-full | tw-py-3 | focus:tw-outline-none" />
      </div>
    </div>
  )
}

export default SearchBar;

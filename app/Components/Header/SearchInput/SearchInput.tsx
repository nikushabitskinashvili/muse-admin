'use client'

import styles from "./SearchInput.module.scss";
import React, { useState } from 'react';
import Image from "next/image";
import { IconEnum } from "@/app/utlis/icons/icons";

const SearchInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<string[]>([]);


    const users = ["Abbey Road", "Back in Black", "Hotel California", "Dark Side of the Moon", "Rumours", "Sgt. Pepper", "Thriller", "The Wall", "Born to Run"];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        setInputValue(searchQuery);

        const filtered = users.filter(user => user.toLowerCase().startsWith(searchQuery));
        setFilteredResults(filtered);
    };

    return (
        <div className={styles.wrapper}>
            <div className={inputValue ? styles.inputTyping : styles.container}>
                <Image src={IconEnum.SEARCH} alt="search" className={styles.searchIcon} width={15} height={15} />
                <input
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            {inputValue && (
                <ul className={styles.results}>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((album, index) => (
                            <li key={index} className={styles.resultItem}>{album}</li>
                        ))
                    ) : (
                        <li className={styles.noResults}>No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
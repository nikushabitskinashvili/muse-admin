'use client'

import styles from "./SearchInput.module.scss";
import React, { useState } from 'react';
import Image from "next/image";
import { IconEnum } from "@/app/utlis/icons/icons";
import { User } from "@/app/interface/props.interface";
import BaseApi from "@/app/api/baseApi";

const SearchInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredResults] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<User[]>([]);



    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setInputValue(value);

        if (value.trim() === '') {
            setFilteredSongs(users);
            return;
        }

        const lowercasedValue = value.toLowerCase();
        BaseApi.get(`/search?query=${lowercasedValue}`).then((response) => {
            setFilteredSongs(response.data.musics);
        });
    };


    return (
        <div className={styles.wrapper}>
            <div className={inputValue ? styles.inputTyping : styles.container}>
                <Image src={IconEnum.SEARCH} alt="search" className={styles.searchIcon} width={15} height={15} />
                <input
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleSearch}
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
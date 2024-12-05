/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Item List
    Displays all items that the user can buy that follow the user specified filter
*/

import React from 'react';
import ItemList from './ItemList';

const FilteredItems = ({ items, filter }) => {
    const filteredItems = items.filter( // Checking that each item follows the user-specified filter
        item => {
            return (
                item.name.toLowerCase().includes(filter.search.toLowerCase()) &&
                item.cost >= filter.minCost &&
                item.cost <= filter.maxCost &&
                (
                    filter[item.category] === true ||
                    (
                        filter.fruit === false &&
                        filter.vegetable === false &&
                        filter.savoury === false &&
                        filter.sweet === false &&
                        filter.neutral === false
                    )
                )
            );
        }
    );

    return (
        <ItemList filteredItems={ filteredItems } />
    );
}

export default FilteredItems;
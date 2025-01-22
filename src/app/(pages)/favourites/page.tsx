"use client";

import GridListWith from "@/components/features/cardwrapper";
import GridListWithCTA from "@/components/features/cta";
import React from "react";

function FavouritesPages() {
  const textHeader = "Welcome to Favourites Page!";

  return (
    <div>
      <GridListWithCTA textHeader={textHeader} />
      <GridListWith />
    </div>
  );
}

export default FavouritesPages;

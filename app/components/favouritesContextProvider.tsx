import React, { createContext, useContext, useState } from "react";

type Favourites = {
  favourites: Set<string>;
  toggleFavourite: (id: string) => void;
};

const FavouritesContext = createContext<Favourites>({
  favourites: new Set(),
  toggleFavourite: () => {},
});

export const useFavourites = () => useContext(FavouritesContext);

const FavouritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<Set<string>>(() => {
    if (typeof localStorage === "undefined") {
      return new Set();
    }

    const cached = localStorage.getItem("favourites");

    return cached ? new Set(JSON.parse(cached)) : new Set();
  });

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite: (id) => {
          favourites.has(id) ? favourites.delete(id) : favourites.add(id);
          localStorage.setItem("favourites", JSON.stringify([...favourites]));
          setFavourites(new Set(favourites));
        },
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;

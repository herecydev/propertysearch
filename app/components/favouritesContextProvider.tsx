import React, { createContext, useContext, useEffect, useState } from "react";

type Favourites = {
  favourites: Set<string>;
  favouritesOnly: boolean;
  toggleFavouritesOnly: () => void;
  toggleFavourite: (id: string) => void;
};

const FavouritesContext = createContext<Favourites>({
  favourites: new Set(),
  favouritesOnly: false,
  toggleFavouritesOnly: () => {},
  toggleFavourite: () => {},
});

export const useFavourites = () => useContext(FavouritesContext);

const FavouritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("favourites");
    if (cached) {
      setFavourites(new Set(JSON.parse(cached)));
    }
  }, []);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favouritesOnly,
        toggleFavouritesOnly: () => {
          setFavouritesOnly(!favouritesOnly);
        },
        toggleFavourite: (id) => {
          favourites.has(id) ? favourites.delete(id) : favourites.add(id);
          localStorage.setItem("favourites", JSON.stringify([...favourites]));
          setFavourites(new Set(favourites));

          // Toggle favourites off if we cleared the last favourite
          if (favourites.size === 0 && favouritesOnly) {
            setFavouritesOnly(false);
          }
        },
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;

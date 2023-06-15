import { useLocation } from "@remix-run/react";
import { useFavourites } from "./favouritesContextProvider";
import Home from "./icons/home";
import Toggle from "./icons/toggle";

const Header = () => {
  const { favourites, favouritesOnly, toggleFavouritesOnly } = useFavourites();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur">
      <div className="xl:container mx-auto flex justify-between items-center p-3">
        <Home />
        {favourites.size > 0 && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={favouritesOnly}
              onChange={toggleFavouritesOnly}
            />
            {pathname === "/" && <Toggle checked={favouritesOnly} />}
          </label>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useFavourites } from "./favouritesContextProvider";
import Heart from "./icons/heart";
import HeartFilled from "./icons/heartFilled";

const Favourite = ({ propertyId }: { propertyId: string }) => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <button
      onClick={() => toggleFavourite(propertyId)}
      className="hover:scale-150 z-10 p-2"
    >
      {favourites.has(propertyId) ? (
        <HeartFilled title="Unfavourite" />
      ) : (
        <Heart title="Favourite" />
      )}
    </button>
  );
};

export default Favourite;

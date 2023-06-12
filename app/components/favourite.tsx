import { useFavourites } from "./favouritesContextProvider";
import Heart from "./icons/heart";
import HeartFilled from "./icons/heartFilled";

const Favourite = ({ propertyId }: { propertyId: string }) => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <button
      onClick={() => toggleFavourite(propertyId)}
      className="hover:scale-150 transition-all z-10 p-2"
    >
      {favourites.has(propertyId) ? (
        <HeartFilled title="Remove from favourites" />
      ) : (
        <Heart title="Add to favourites" />
      )}
    </button>
  );
};

export default Favourite;

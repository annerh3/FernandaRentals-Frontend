import { Link } from "react-router-dom";

export const ItemPresentation = ({
  isDarkMode,
  imgUrl,
  alt,
  nameSpace,
  linkTo,
  titleLink,
}) => {
  return (
    <>
      <Link
        to={linkTo}
        title={titleLink}
        className="flex items-center justify-center md:justify-start space-x-3 mb-3"
      >
        <img
          //   "https://i.postimg.cc/Y02vKjST/siidni-logo.png"
          src={imgUrl}
          alt={alt}
          className={`${
            !isDarkMode ? "drop-shadow-sm shadow-black" : " "
          } h-10 object-cover object-center`}
        />
        <span
          className={`hidden md:inline ${
            !isDarkMode ? "drop-shadow-sm shadow-black" : " "
          } text-[#d56e18] text-xl font-semibold`}
        >
          {nameSpace}
        </span>
      </Link>
    </>
  );
};

import PropTypes from "prop-types";

const PageHeader = ({ header }) => {
  return (
    <span className="px-2 b text-green-800 opacity-70 underline">{header}</span>
  );
};

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
};

export default PageHeader;

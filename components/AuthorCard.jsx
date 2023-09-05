export const AuthorCard = ({ author, handleQuoteUpdate }) => {
  return (
    <div
      className="author shadow-md p-5 rounded-md"
      style={{
        width: "800px",
      }}
      onClick={() => handleQuoteUpdate()}
    >
      <div className="author-info">
        <h3 className="text-2xl font-bold">{author.name}</h3>
      </div>
    </div>
  );
};

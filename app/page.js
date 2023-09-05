"use client";
import { AuthorCard } from "@/components/AuthorCard";
import { useState, useEffect } from "react";
import ApiClient from "../ApiClient/client";

export default function Home() {
  const apiClient = new ApiClient();

  const [authors, setAuthors] = useState([]);
  const [quote, setQuote] = useState({});
  const [range, setRange] = useState([0, 10]);

  const getAndUpdateAuthors = async () => {
    try {
      const response = await apiClient.getAuthors(range[0], range[1]);
      setAuthors(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomQuote = async () => {
    try {
      const response = await apiClient.getQuote();
      setQuote(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuoteByAuthor = async (authorId) => {
    try {
      const response = await apiClient.getQuoteByAuthor(authorId);

      console.log(response.data.results);

      setQuote(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAndUpdateAuthors();
  }, [range]); // Include 'range' as a dependency to trigger the effect when 'range' changes

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handlePreviousClick = () => {
    if (range[0] - 10 >= 0) {
      setRange([range[0] - 10, range[1] - 10]);
    }
  };

  const handleNextClick = () => {
    if (range[1] + 10 <= 100) {
      setRange([range[0] + 10, range[1] + 10]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {quote && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-center">{quote.content}</h1>
          <h2 className="text-xl font-bold text-center">- {quote.author}</h2>
          <p className="text-center text-muted">
            {quote?.tags?.map((tag) => {
              return <span>{tag}</span>;
            })}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
            onClick={getRandomQuote}
          >
            Get Random Quote
          </button>
        </div>
      )}
      {
        !quote && "We couldn't find any quotes for this author. Please try another author."
      }
      <div className="flex items-center justify-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePreviousClick}
        >
          {"<< "}Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextClick}
        >
          Next {">> "}
        </button>
      </div>
      <p className="text-muted text-center mt-5 mb-5">
        Just click on the author's name to see a quote from them!
      </p>
      <div className="flex flex-col items-center justify-center gap-4">
        {authors?.map((author) => {
          return (
            <AuthorCard
              key={author._id}
              author={author}
              handleQuoteUpdate={() => getQuoteByAuthor(author._id)}
            />
          );
        })}
      </div>
    </main>
  );
}

import React, { useEffect } from "react";
import { useTv } from "../hooks";
import MovieListItem from "./MovieListItem";


export default function LatestUploads() {


  const { fetchLatestUploads, latestUploads } = useTv();


  const handleUIUpdate = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className="bg-white shadow dark:shadow-white dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Tv Series Uploads
        </h1>

        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
                // onDeleteClick={() => handleOnDeleteClick(movie)}
                // onEditClick={() => handleOnEditClick(movie)}
              />
            );
          })}
        </div>
      </div>

      {/* <ConfirmModal
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        busy={busy}
      />

      <UpdateMovie
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
    </>
  );
}

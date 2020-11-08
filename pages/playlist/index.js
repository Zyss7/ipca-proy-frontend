import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import PlaylistTable from "@components/playlist/playlistTable";
import PrivateLayout from "@layouts/privateLayout";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const PlaylistContainer = () => {
  const [cargando, setCargando] = useState(false);
  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        <main className="container-fluid">
          <h1 className="text-center display-4 my-5">
            Playlists
            <Link href="/playlist/form">
              <a>
                <AiOutlinePlusCircle color="green" className="pointer" />
              </a>
            </Link>
          </h1>
          {!cargando && (
            <div className="row justify-content-center">
              <div className="col-lg-11 align-self-center ">
                <PlaylistTable />
              </div>
            </div>
          )}
        </main>
      </LoadingWrapper>
    </PrivateLayout>
  );
};

export default PlaylistContainer;

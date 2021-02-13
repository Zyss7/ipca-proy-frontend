import Link from "next/link";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import PlaylistTable from "./playlistTable";

/**
 *
 * @param {{cargando:boolean,data:[]}} param0
 * @example
 * const listas = []
 * @return (
 *  <PlaylistAdmin data={listas}/>
 * )
 */
const PlaylistAdmin = ({ data }) => {
  return (
    <main className='container-fluid'>
      <h1 className='text-center display-4 my-5'>
        Playlists
        <Link href='/playlist/form'>
          <a>
            <AiOutlinePlusCircle color='green' className='pointer' />
          </a>
        </Link>
      </h1>

    <div className='row justify-content-center'>
        <div className='col-lg-11 align-self-center '>
          <PlaylistTable data={data} />
        </div>
      </div>
    </main>
  );
};

export default PlaylistAdmin;

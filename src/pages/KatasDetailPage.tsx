import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from 'react-router-dom';

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataById } from "../services/katasService";
import { Kata } from "../utils/types/Kata.type";
import { Editor } from "../components/editor/Editor";

export const KatasDetailPage = () => {

  // Find id from params
  let { id } = useParams();

  let loggedIn = useSessionStorage('sessionJWTToken');
  let navigate = useNavigate();

  const [kata, setKata] = useState <Kata | undefined> (undefined);

  const [showSolution, setShowSolution] = useState(true)

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      if (id) {
        getKataById(loggedIn, id).then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            let kataData = {
              _id: response.data._id,
              name: response.data.name,
              description: response.data.description,
              level: response.data.level,
              valoration: response.data.valoration,
              user: response.data.user,
              date: response.data.date,
              chance: response.data.chance,
              numVal: response.data.numVal,
              solution: response.data.solution,
              ratings: response.data.ratings
            }

            setKata(kataData)

            console.table(kataData)
          }
        }).catch((error) => console.error(`[Kata By ID Error] ${error}`))
      } else {
        return navigate('/katas')
      }
    }
  }, [id, loggedIn, navigate])

  return (
    <div>
      <h1>
        Katas Detail Page: { id }
      </h1>
      { kata ? 
        <div className="kata-data">
          <h2>{kata?.description}</h2>
          <h3>Rating: {kata.valoration}/5</h3>
          <button onClick={() => setShowSolution(!showSolution)}>{showSolution ? 'Show Solution' : 'Hide Solution'}</button>
    
          { showSolution ? null : <Editor>{kata.solution}</Editor>}
        </div>    
      :
        <div>
          <h2>
            Loading data...
          </h2>
        </div>
      }
    </div>
  )
}
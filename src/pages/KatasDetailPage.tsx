import React, { useEffect } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from 'react-router-dom';

import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasDetailPage = () => {

  // Find id from params
  let { id } = useParams();

  let loggedIn = useSessionStorage('sessionJWTToken');

  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    }
  }, [loggedIn, navigate])

  return (
    <div>
      <h1>
        Katas Detail Page: { id }
      </h1>
    </div>
  )
}
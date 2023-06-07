import React from 'react'
import './index.css'

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './pages/Login/index.js';
import { Chat } from './pages/Chat';
import { ChatDetail } from './pages/Chat/Components/ChatDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/chat/:id",
    element: <ChatDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

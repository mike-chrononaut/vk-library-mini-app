import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { AppInfoProvider } from "./AppContext";
import { RouterContext } from "@happysanta/router";
import { router } from "./routes";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <AppInfoProvider>
    <RouterContext.Provider value={router}>
      <App />
    </RouterContext.Provider>
  </AppInfoProvider>
  
, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

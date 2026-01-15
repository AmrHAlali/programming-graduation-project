import Main from "./src/main";

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  return <Main />;
}
import { Token } from ".";

export function getDataInLocalStorage(key: string) {
  const dataString = localStorage.getItem(key!);

  if (!dataString || dataString === undefined) {
    return "";
  }

  if (typeof dataString === "string") {
    const json = dataString === undefined ? "" : JSON.parse(dataString);

    return json;
  }
  return "";
}

export function getTokensLocalStorage(): Token | null {
  const token = getDataInLocalStorage("@chat:t");

  return token;
}

export function setTokensLocalStorage(token: Token | null) {
  const tokensEmpty = {
    accessToken: "",
  };
  localStorage.setItem("@chat:t", JSON.stringify(token ?? tokensEmpty));
}

export function clearTokensLocalStorage() {
  const teste = localStorage.removeItem("@chat:t");
  return teste;
}

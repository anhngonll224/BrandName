const STORAGE = {
  TOKEN: "token-brandname",
  USER_INFO: "user-info-brandname",
  KEY_MENU_ACTIVE: "key-active",
}

export const getStorage = name => {
  const data =
    typeof window !== "undefined" && name !== undefined
      ? localStorage.getItem(name)
      : ""
  try {
    if (data) return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setStorage = (name, value) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value
  return localStorage.setItem(name, stringify)
}

export const deleteStorage = name => localStorage.removeItem(name)

export const clearStorage = () => localStorage.clear()

export default STORAGE

import { setStore, getStore, removeStore } from './localStore'

const TokenKey = 'User-Token'

export const getToken = () => getStore(TokenKey)

export const setToken = (token) => setStore(TokenKey, token)

export const removeToken = () => removeStore(TokenKey)

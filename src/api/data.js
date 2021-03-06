import * as api from "./api.js";
import Parse from '../../node_modules/parse/dist/parse.js'

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
  '48BkBrVWc2vgaWll9O6ktpdDS4SKQoJla55qCjPq',
  'j2LuPEhDJVN3XfVnbuW4Ku1vpogMtKQ2QS0AVNum',
);

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const logout = api.logout;

export async function getAll() {
  return await api.getRequest(host + '/classes/Flashcard');
}

export async function getBasicItems() {
  return await api.getRequest(host + '/flashcards-basic');
}

export async function getAdvancedItems() {
  return await api.getRequest(host + '/flashcards-advanced');
}

export async function getWebItems() {
  return await api.getRequest(host + '/flashcards-web');
}

export async function getMyItem() {
  const userId = sessionStorage.getItem('userId');
  return await api.getRequest(host + `/my-cards/${userId}`);
}

export async function createItem(data) {
  return await api.postRequest(host + '/classes/Flashcard', data);
}

export async function editItem(id, data) {
  return await api.putRequest(host + `/data/ideas/${id}`, data);
}

export async function deleteItem(id) {
  return await api.deleteRequest(host + `/data/ideas/${id}`);
}
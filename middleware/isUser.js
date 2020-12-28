export default function ({ store, redirect }) {
  if (store.getters['auth/loggedUser']) return
  
  redirect('/signup')
}
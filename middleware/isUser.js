export default function ({ store, redirect }) {
  const user = store.getters['auth/loggedUser']
  
  if (user) return
  
  redirect('/')
}
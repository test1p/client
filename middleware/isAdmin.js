export default function ({ store, redirect }) {
  const user = store.getters['auth/loggedUser']
  
  if (user && user.role === 0) return
  
  redirect('/')
}
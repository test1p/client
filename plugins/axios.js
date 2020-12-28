export default function ({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  })
  
  $axios.onResponse(response => {
    if(response.data.user) {
      store.dispatch('auth/user')
    }
    
    if(response.data.message) {
      store.dispatch('commitMessage', response.data.message)
      return
    }
    
    if(response.status !== 201) return
    
    store.dispatch('successMessage')
    return
  })
  
  $axios.onError(error => {
    if (!error.response || !error.response.status) return redirect('/error')
    
    const status = error.response.status
    const errors = error.response.data.errors
    
    if(status === 422) {
      if (!errors) return alert('入力内容に誤りがあります')
      
      var messages = []
      Object.keys(errors).forEach(x => {
        const values = errors[x]
        values.forEach(y => {
          messages = [...messages, y]
        })
      })
      return alert(messages.join('\n'))
    }
    else if(status === 401) {
      if (!errors) {
        alert('認証エラーです')
      }
      else {
        alert(errors)
      }
      
      return redirect('/')
    }
    else if(status === 403) {
      if (!errors) {
        alert('権限がありません')
      }
      else {
        alert(errors)
      }
      
      return redirect('/')
    }
    else {
      throw new Error(status)
    }
  })
}
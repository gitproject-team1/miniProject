// 목록 조회
export async function getTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202209',
      'username': 'KDT3_ImYeJi'
    }
    })
    const json = await res.json()
    console.log(json)
    return json
  }
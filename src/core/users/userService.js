
export const getAllUsers = (payload) => {
 
  const requestOption = {
    method: "GET",
    headers: new Headers({ }),
  }
  return fetch(`https://randomuser.me/api`, requestOption)
}
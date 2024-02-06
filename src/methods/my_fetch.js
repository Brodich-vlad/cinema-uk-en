import { options } from "./options"

export function myFetch(url){
    return fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Movies not found`));
  });
    
}
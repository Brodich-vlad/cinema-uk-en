export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTYzNzc0MDk5MTkwZTdlZTEyMmRlZTM1MzVlOGU3NSIsInN1YiI6IjY0YjI5ODVkMjNkMjc4MDBjOTNiYTI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jbemps_MCpCT-LruA9-XfhO2sKJCdCwTF2q_7M7lSgU'
  }
};


export const urlFilms = (lang='',filmsNumPage) => {
  return `https://api.themoviedb.org/3/discover/movie?include_abult=false&language=${lang}&page=${filmsNumPage}`;
};

export const urlStars = (lang='') => {
  return `https://api.themoviedb.org/3/person/popular?include_abult=false&language=${lang}`;
}

export const urlVideo = (id, lang='') => {
  return `https://api.themoviedb.org/3/movie/${id}/videos?language=${lang}`;
}

export const urlMovie = (id, lang='') => {
  return `https://api.themoviedb.org/3/movie/${id}?language=${lang}`
}

export const urlSearch = (search ='', lang='', num=1) => {
  return `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=${lang}&page=${num}`
}

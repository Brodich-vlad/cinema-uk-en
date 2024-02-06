// Картинки заглушки.
import background from '../image/background/fon-kinolenta.jpg';
import affiche from '../image/background/affiche.jpg'

const randomIndexs = (num) =>{
    const schedule = [9,11,13,15,17,19,21,22];
    let length = schedule.length
    let b = num.toFixed()
    let arr = []
    for (let i = 0; i <= b; i++) {
        let a = Math.floor(Math.random() * length)
        if(!arr.includes(schedule[a])){
            arr.push(schedule[a])
        }
    }
    arr.sort(function(a, b) {
        return a - b;
    });
    return arr
}


const randomSchedule = (rating) =>{
    let arr = randomIndexs(rating/2.5)
    const newArr = arr.map((e)=>{
        return{
            time:e,
            price:e === 9 || e === 11 ? 70: e === 13 || e === 15 ? 90: e === 17 || e === 19 ? 120 : 60,
            premiere: rating > 8  ? true : false,
        }
    })
    return newArr

}

// export function createObjFilm(data, num=1, flag =false) {
//     const { id, title, name, poster_path, backdrop_path, overview, vote_average, release_date, first_air_date } = data;

//     return {
//          id:id,
//         name: title || name, 
//         info: overview,
//         price:flag && num === 1 && vote_average.toFixed(0) > 5 ?  randomSchedule(vote_average): null,
//         premiere:flag && num === 1 && vote_average > 8  ? true : false,
//         image: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: affiche,
//         backdrop: backdrop_path ? `https://image.tmdb.org/t/p/original/${backdrop_path}`: background,
//         rating: vote_average.toFixed(1), 
//         date: release_date || first_air_date,
//     }
// }



export function createNewData(data, num=1, flag) {
    // const pageNum = data.page;
    const newData = data.map(({ id, title, name, poster_path, backdrop_path, overview, vote_average, release_date, first_air_date }) => {
        return{
            id:id,
            name: title || name, 
            info: overview,
            price:flag && num === 1 && vote_average.toFixed(0) > 5 ?  randomSchedule(vote_average): null,
            premiere:flag && num === 1 && vote_average > 8  ? true : false,
            image: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: affiche,
            backdrop: backdrop_path ? `https://image.tmdb.org/t/p/original/${backdrop_path}`: background,
            rating: vote_average.toFixed(1), 
            date: release_date || first_air_date,
        }
    })
    return newData
}
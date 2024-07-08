const searchForm=document.querySelector('.searchform');
const movieContainer=document.querySelector('.movie-container');
const inputBox =document.querySelector('.inputBox');
 
const showdetails=(data)=>{
  movieContainer.innerHTML=" ";
  movieContainer.classList.remove('noBackGround');
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

  const movieElement = document.createElement('div');
  movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating:</strong>${imdbRating}</p>`;
     const movieGenreElement = document.createElement('div');
      movieGenreElement.classList.add('movie-genre');
      Genre.split(",").forEach (element => {
      const p = document.createElement('p');
      p.innerText = element;
      movieGenreElement.appendChild(p);
      });
       movieElement.appendChild(movieGenreElement);
       movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
       <p><strong>Duration: </strong>${Runtime}</p>
       <p><strong>Cast: </strong>${Actors}</p>
       <p><strong>Plot: </strong>${Plot}</p>`;
       // Creating a div for movie poster
       const moviePosterElement = document.createElement('div');
       moviePosterElement.classList.add('movie-poster');
       moviePosterElement.innerHTML = `<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
}

function showError(err){
  movieContainer.innerHTML=`<h2>${err}</h2>`;
  movieContainer.classList.add('noBackGround');
}


const getdetails= async(movie) =>{
  try{
  const api="41074cfd";
  const url=`http://www.omdbapi.com/?apikey=${api}&t=${movie}`;
  const res= await fetch(url);
  if(!res.ok){
    throw new Error("Movie not found");
  }
  const data=await res.json();
  console.log(data);
  showdetails(data);
  }catch(err){
    showError("No Movie Found");
  }
}

searchForm.addEventListener('submit',(e)=>{
 e.preventDefault();
  const MovieName=inputBox.value.trim();
  if(MovieName!=""){
    getdetails(MovieName);
  }
  else{
    movieContainer.innerHTML=`<h2>Enter Movie Name to get Movie Details</h2>`
    movieContainer.classList.add('noBackGround');
  }
});

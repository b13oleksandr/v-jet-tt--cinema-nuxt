import axios from "axios";

export // eslint-disable-next-line @typescript-eslint/ban-types
const fetchMovies = (params: null | object | any, callback: (arg: any) => void) => {
  let internalParams = "";

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        internalParams += `${key}=${value}`;
      }
    }
  }

  if (internalParams) {
    internalParams = "?" + internalParams;
  }

  axios
    .get(`https://cinema-api-test.y-media.io/v1/movies${internalParams}`)
    .then((response: any) => {
      callback(response.data.data);
    });
};

export const fetMoviesSessions = (
  movieId: number,
  callback: (arg: any) => void
) => {
  axios
    .get(
      `https://cinema-api-test.y-media.io/v1/movieShows?movie_id=${movieId}`
    )
    .then((response: any) => {
      callback(response.data.data);
    });
};

export const fetchFreePlaces = (
  movieId: number,
  showdate: string,
  daytime: string,
  callback: (arg: any) => void
) => {
  axios
    .get(
      `https://cinema-api-test.y-media.io/v1/showPlaces?movie_id=${movieId}&daytime=${daytime}&showdate=${showdate}`
    )
    .then((response: any) => {
      callback(response.data.data);
    });
};

export const bookPlace = (
  movieId: number,
  row: number,
  seat: number,
  showdate: string,
  daytime: string,
  callback: (arg: any) => void
) => {
  axios
    .post(`https://cinema-api-test.y-media.io/v1/bookPlace`, {
      movie_id: movieId,
      row,
      seat,
      showdate,
      daytime,
    })
    .then((response: any) => {
      callback(response.data.data);
    });
};

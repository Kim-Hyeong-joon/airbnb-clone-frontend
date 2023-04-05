import {
  MutationFunction,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { formatDate } from "./lib/utils";
import { IBooking } from "./routes/RoomReservation";
import { IRoomDetail } from "./types";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://airbnbclone-9g3l.onrender.com/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [first, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getReviews = ({ queryKey }: QueryFunctionContext) => {
  const [first, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post("users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface ISignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
  password2: string;
}

export interface ISignUpSuccess {
  ok: string;
}

export interface ISignUpError {
  response: { data: { error: string } };
}

export const signUp = ({
  name,
  email,
  username,
  password,
  password2,
}: ISignUpVariables) =>
  instance
    .post(
      "users/sign-up",
      { name, email, username, password, password2 },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities/`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`/categories/`).then((response) => response.data);

export interface IUplaodRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export interface IEditRoomVariables {
  roomPk: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export interface IUploadError {
  response: { data: { error: string } };
}

export const uploadRoom = (variables: IUplaodRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const editRoom = (variables: IEditRoomVariables) =>
  instance
    .put(`rooms/${variables.roomPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [first, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);

    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};

export interface IReserveBooking {
  dates: Date[];
  roomPk: string;
  guests: number;
}

export interface IReserveSuccess {
  pk: string;
  room: string;
  check_in: string;
  check_out: string;
  experience_time: string;
  guests: number;
}

export interface IReserveError {
  check_in: string[];
  check_out: string[];
  guests: string[];
}

export const reserveBooking = ({ dates, roomPk, guests }: IReserveBooking) => {
  const [firstDate, secondDate] = dates;
  const checkIn = formatDate(firstDate);
  const checkOut = formatDate(secondDate);
  const data = { check_in: checkIn, check_out: checkOut, guests: guests };

  return instance
    .post(`rooms/${roomPk}/bookings`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

interface IFormData {
  year: number;
  month: number;
}

export type GetReservationQueryKey = [
  string,
  string?,
  {
    year: number;
    month: number;
  }?
];

export const getReservation = ({
  queryKey,
}: QueryFunctionContext<GetReservationQueryKey>) => {
  const [_, roomPk, formData] = queryKey;
  const year = formData?.year;
  const month = formData?.month;
  return instance
    .get(`rooms/${roomPk}/bookings?year=${year}&month=${month}`)
    .then((response) => response.data);
};

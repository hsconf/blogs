export interface Posts {
    id: number;
    message: string;
    media: string;
    name: string;
    created_at: string;
}

export interface PostMutation {
    message: string;
    media: string;
}

export interface IPost extends PostMutation {
    id: string
}

export interface User {
    name: string;
    password: string;
}

export interface IUser {
    name: string;
    token: string;
}

export interface ErrorResponse {
    success: boolean;
    message: string | {
        [key: string]: string;
};
}
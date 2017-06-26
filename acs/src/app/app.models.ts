export class ResponseModel<T> {
    result: T;
    detail: string;
}

export class RepositoryModel {
    id: number;
    name: string;
    isConnected: boolean;
}

export class CodeStyleModel {
    id: number;
    name: string;
    repository: string;
}

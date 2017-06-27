export class ResponseModel<T> {

    result: T;
    detail: string;

    constructor(result?: T, detail?: string) {
        this.result = result;
        this.detail = detail;
    }
}

export class RepositoryModel {

    id: number;
    name: string;
    isConnected: boolean;

    constructor(id?: number, name?: string, isConnected?: boolean) {
        this.id = id;
        this.name = name;
        this.isConnected = isConnected;
    }
}

export class CodeStyleModel {
    id: number;
    name: string;
    repository: string;
}

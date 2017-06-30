export class ResponseModel<T> {

    result: T;
    detail: string;
    status: number;

    constructor(result?: T, detail?: string, status?: number) {
        this.result = result;
        this.detail = detail;
        this.status = status;
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
    calculationStatus: string;

    constructor(id?: number, name?: string, repository?: string, calculationStatus?: string) {
        this.id = id;
        this.name = name;
        this.repository = repository;
        this.calculationStatus = calculationStatus;
    }

}

export class RepositoryUpdateModel {

    datetime: Date;
    status: string;

    constructor(datetime?: Date, status?: string) {
        this.datetime = datetime;
        this.status = status;
    }

}

export class CalculationStatus {
    static started = 'S';
    static failed = 'F';
    static completed = 'C';
}

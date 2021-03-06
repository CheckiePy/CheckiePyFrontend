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
    codeStyleName: string;

    constructor(id?: number, name?: string, isConnected?: boolean, codeStyleName?: string) {
        this.id = id;
        this.name = name;
        this.isConnected = isConnected;
        this.codeStyleName = codeStyleName;
    }
}

export class CodeStyleModel {

    id: number;
    name: string;
    repository: string;
    calculationStatus: string;
    selected: boolean;

    constructor(id?: number, name?: string, repository?: string, calculationStatus?: string, selected?: boolean) {
        this.id = id;
        this.name = name;
        this.repository = repository;
        this.calculationStatus = calculationStatus;
        this.selected = selected;
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

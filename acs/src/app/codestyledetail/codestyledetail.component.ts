import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-codestyledetail',
    templateUrl: './codestyledetail.component.html',
    styleUrls: ['./codestyledetail.component.css']
})
export class CodeStyleDetailComponent implements OnInit {

    single: any[] = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        }
    ];

    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    constructor() {
    }

    ngOnInit() {
    }

}

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-codestyledetail',
    templateUrl: './codestyledetail.component.html',
    styleUrls: ['./codestyledetail.component.css']
})
export class CodeStyleDetailComponent implements OnInit {

    single: any[] = [
        {
            "name": "36",
            "value": 2
        },
        {
            "name": "81",
            "value": 1,
        },
        {
            "name": "71",
            "value": 1,
        }
    ];

    view: any[] = [700, 400];

    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'File length';
    showYAxisLabel = true;
    yAxisLabel = 'File count';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
    }

    ngOnInit() {
    }

}

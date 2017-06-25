import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CodeStyleDetailComponent} from './codestyledetail.component';

describe('CodeStyleDetailComponent', () => {
    let component: CodeStyleDetailComponent;
    let fixture: ComponentFixture<CodeStyleDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CodeStyleDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeStyleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

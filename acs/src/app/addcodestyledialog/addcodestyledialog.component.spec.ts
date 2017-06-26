import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCodeStyleDialogComponent} from './addcodestyledialog.component';

describe('AddCodeStyleDialogComponent', () => {
    let component: AddCodeStyleDialogComponent;
    let fixture: ComponentFixture<AddCodeStyleDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddCodeStyleDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCodeStyleDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

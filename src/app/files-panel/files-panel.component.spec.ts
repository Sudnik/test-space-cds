import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesPanelComponent } from './files-panel.component';

describe('FilesPanelComponent', () => {
  let component: FilesPanelComponent;
  let fixture: ComponentFixture<FilesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

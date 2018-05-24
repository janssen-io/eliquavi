import { CreatorComponent } from './creator.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilterService } from '../services/filter.service';
import { IFilter } from '../models/filter.model';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../../app.module';

let filterServiceStub: Partial<FilterService>;

filterServiceStub = {
    get: (id) => Observable.create(
        {name: 'Test Filter', content: 'code', enabled: true}
    )
};

TestBed.configureTestingModule({
    imports: [ AppModule ],
    declarations: [ CreatorComponent ],
    providers:    [ {provide: FilterService, useValue: filterServiceStub } ]
});

describe('CreatorComponent', () => {
    let fixture: ComponentFixture<CreatorComponent>;
});

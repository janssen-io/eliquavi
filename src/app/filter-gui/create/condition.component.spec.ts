import { Filter, AndGroup, Expression, OrGroup, Operator } from '../models';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ConditionComponent } from './condition.component';

describe('ConditionComponent', () => {
  let model: Filter;
  const dummyExpression = new Expression('five', Operator.GreaterThan, 'two');
  const [AND, OR, EXPR] = ['.and', '.or', '.expression'];

  let fixture: ComponentFixture<ConditionComponent>;
  let app: ConditionComponent;
  let dom: HTMLElement;

  beforeEach(() => {
    model = new Filter();

    TestBed.configureTestingModule({
      providers: [
        ConditionComponent
      ],
      declarations: [
        ConditionComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionComponent);
    app = fixture.debugElement.componentInstance;
    dom = fixture.debugElement.nativeElement;
  });

  it('shows all child conditions in an AndGroup', () => {
    model.condition = new AndGroup([dummyExpression, dummyExpression]);
    fixture.componentInstance.condition = model.condition;
    fixture.detectChanges();

    const expressionNodes = dom.querySelectorAll(`${AND} ${EXPR}`);
    expect(expressionNodes.length).toBe(2);
    Array.from(expressionNodes).forEach(node => {
      expect(node.textContent).toContain('five is greater than two');
    });
  });

  it('shows deeper nested conditions', () => {
    model.condition = new AndGroup([
      new OrGroup([dummyExpression])
    ]);
    fixture.componentInstance.condition = model.condition;
    fixture.detectChanges();

    const andNode = dom.querySelector(AND);

    const orNode = andNode.querySelector(OR);
    expect(orNode).toBeDefined();
    expect(orNode.querySelector(EXPR)).toBeDefined();

    expect(andNode.textContent).toContain('five is greater than two');
  });

  it('changes to the model are dynamically updated', () => {
    model.condition = new AndGroup([
      new OrGroup([dummyExpression])
    ]);
    fixture.componentInstance.condition = model.condition;
    fixture.detectChanges();
    const andNode = dom.querySelector(AND);

    // sanity check
    const orNode = andNode.querySelector(OR);
    expect(orNode).toBeDefined();

    const orModel = <OrGroup>(<AndGroup>model.condition).all[0];
    const exprModel = <Expression>orModel.any[0];

    exprModel.operator = Operator.NotEqualTo;
    fixture.detectChanges();
    expect(orNode.textContent).toContain('five is not equal to two');
  });

  describe('Changes in the interface are updated in the model.', () => {
    describe('When the model is empty', () => {
      it('adds an expression to the model', () => {
        expect(app.condition).toBeUndefined();
        const addButton: HTMLInputElement = <HTMLInputElement>dom.querySelector('.add-expression');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelector(EXPR)).toBeDefined();
        expect(app.condition).toBeDefined();
      });

      it('adds an AND to the model', () => {
        expect(app.condition).toBeUndefined();
        const addButton: HTMLInputElement = <HTMLInputElement>dom.querySelector('.add-and');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelector(AND)).toBeDefined();
        expect(app.condition).toBeDefined();
      });
    });

    describe('When the model contains a single expression', () => {
      it('creates an AND group when a second expression is added.', () => {
        app.condition = dummyExpression;
        const addButton: HTMLInputElement = <HTMLInputElement>dom.querySelector('.add-expression');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelector(AND)).toBeDefined();
        expect(dom.querySelectorAll(`${AND} ${EXPR}`).length).toBe(2);
        expect((<AndGroup>app.condition).all.length).toBe(2);
      });

      it('adds the existing expression to the new group', () => {
        app.condition = dummyExpression;
        const addButton: HTMLInputElement =
          <HTMLInputElement>dom.querySelector('.add-and');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelectorAll(`${AND} ${EXPR}`).length).toBe(1);
        expect((<AndGroup>app.condition).all.length).toBe(1);
      });
    });

    describe('When the model contains a group', () => {
      it('adds a new expression to the existing group', () => {
        app.condition = new OrGroup([]);
        const addButton: HTMLInputElement =
          <HTMLInputElement>dom.querySelector('.add-expression');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelectorAll(`${OR} ${EXPR}`).length).toBe(1);
        expect((<OrGroup>app.condition).any.length).toBe(1);
      });

      it('adds a new group to the existing group', () => {
        app.condition = new OrGroup([]);
        const addButton: HTMLInputElement =
          <HTMLInputElement>dom.querySelector('.add-and');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelectorAll(`${OR} ${AND}`).length).toBe(1);
        expect((<OrGroup>app.condition).any.length).toBe(1);
      });
    });
  });
});

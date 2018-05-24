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

  describe('Rendering AndGroups', () => {
    it('should show all child conditions in an AndGroup', () => {
      app.condition = new AndGroup([dummyExpression, dummyExpression]);
      fixture.detectChanges();

      const expressionNodes = dom.querySelectorAll(`${AND} ${EXPR}`);
      expect(expressionNodes.length).toBe(2);
    });

    it('should show "and" between each child condition', () => {
      const children = [dummyExpression, new OrGroup([dummyExpression]), dummyExpression];
      app.condition = new AndGroup(children);
      fixture.detectChanges();

      const andNodes = dom.querySelectorAll(`${AND} .separator`);
      expect(andNodes.length).toBe(children.length - 1);
    });
  });

  describe('Rendering OrGroups', () => {
    it('should show all child conditions in an OrGroup', () => {
      app.condition = new OrGroup([dummyExpression, dummyExpression]);
      fixture.detectChanges();

      const expressionNodes = dom.querySelectorAll(`${OR} ${EXPR}`);
      expect(expressionNodes.length).toBe(2);
    });

    it('should show "or" between each child condition', () => {
      const children = [dummyExpression, new AndGroup([dummyExpression]), dummyExpression];
      app.condition = new OrGroup(children);
      fixture.detectChanges();

      const orNodes = dom.querySelectorAll(`${OR} .separator`);
      expect(orNodes.length).toBe(children.length - 1);
    });
  });

  describe('Rendering Expressions', () => {
    it('should show the properties of the expression', () => {
      const [lhs, op, rhs] = ['left hand side', Operator.NotMatch, 'right hand side'];
      app.condition = new Expression(lhs, op, rhs);
      fixture.detectChanges();
      const expressionNodes = dom.querySelectorAll(EXPR);
      expect(expressionNodes.length).toBe(1);
      expect(expressionNodes[0].querySelectorAll('input')[0].value).toContain(lhs);
      expect(expressionNodes[0].querySelector('select').value).toContain(op);
      expect(expressionNodes[0].querySelectorAll('input')[1].value).toContain(rhs);
    });
  });

  it('should show deeper nested conditions', () => {
    model.condition = new AndGroup([
      new OrGroup([dummyExpression])
    ]);
    fixture.componentInstance.condition = model.condition;
    fixture.detectChanges();

    const andNode = dom.querySelector(AND);

    const orNode = andNode.querySelector(OR);
    expect(orNode).toBeDefined();
    expect(orNode.querySelectorAll(EXPR).length).toBe(1);
  });

  it('changes to the model are dynamically updated', () => {
    model.condition = new AndGroup([
      new OrGroup([dummyExpression])
    ]);
    fixture.componentInstance.condition = model.condition;
    fixture.detectChanges();
    const andNode = dom.querySelector(AND);

    // sanity check
    const inputs = <HTMLInputElement[]>Array.from(andNode.querySelectorAll(`${OR} input`));
    const select = <HTMLSelectElement>andNode.querySelector('select');
    // expect(orNode).toBeDefined();

    const orModel = <OrGroup>(<AndGroup>model.condition).all[0];
    const exprModel = <Expression>orModel.any[0];

    exprModel.operator = Operator.NotEqualTo;
    fixture.detectChanges();
    expect(inputs[0].value).toContain('five');
    expect(inputs[1].value).toEqual('two');
    expect(select.value).toEqual(Operator.NotEqualTo);
  });

  describe('Changes in the interface are updated in the model.', () => {
    describe('When the model is empty', () => {
      it('should add an AND group by default', () => {
        expect(app.condition).toEqual(new AndGroup());
        fixture.detectChanges();
        expect(dom.querySelector('.and')).toBeTruthy();
      });

      it('adds an expression to the model', () => {
        expect(app.condition).toEqual(new AndGroup());
        fixture.detectChanges();
        expect(dom.querySelector('.and')).toBeTruthy();
        const addButton: HTMLInputElement = <HTMLInputElement>dom.querySelector('.add-expression');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelector(EXPR)).toBeDefined();
        expect(app.condition).toBeDefined();
      });
    });

    describe('When the model contains a group', () => {
      it('adds a new expression to the existing group', () => {
        app.condition = new OrGroup();
        fixture.detectChanges();
        expect(dom.querySelector('.or .add-expression')).toBeTruthy();
        const addButton: HTMLInputElement =
          <HTMLInputElement>dom.querySelector('.add-expression');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelectorAll(`${OR} ${EXPR}`).length).toBe(1);
        expect((<OrGroup>app.condition).any.length).toBe(1);
      });

      it('adds a new group to the existing group', () => {
        app.condition = new OrGroup();
        fixture.detectChanges();
        const addButton: HTMLInputElement =
          <HTMLInputElement>dom.querySelector('.add-and');
        addButton.click();
        fixture.detectChanges();
        expect(dom.querySelectorAll(`${OR} ${AND}`).length).toBe(1);
        expect((<OrGroup>app.condition).any.length).toBe(1);
      });
    });

    describe('deleting of conditions', () => {
      it('should delete an expression.', () => {
        app.condition = new AndGroup();
        (<AndGroup>app.condition).add(Expression.Empty());
        fixture.detectChanges();
        const deleteButton = <HTMLInputElement>dom.querySelector(`${EXPR} .delete`);
        deleteButton.click();
        expect(app.condition).toEqual(new AndGroup());
      });

      it('should delete an and group.', () => {
        app.condition = new AndGroup();
        (<AndGroup>app.condition).add(new AndGroup());
        fixture.detectChanges();
        const deleteButton = <HTMLInputElement>dom.querySelector(`${AND} .delete`);
        deleteButton.click();
        expect(app.condition).toEqual(new AndGroup());
      });

      it('should delete an or group.', () => {
        app.condition = new AndGroup();
        (<AndGroup>app.condition).add(new OrGroup());
        fixture.detectChanges();
        const deleteButton = <HTMLInputElement>dom.querySelector(`${OR} .delete`);
        deleteButton.click();
        expect(app.condition).toEqual(new AndGroup());
      });

      it('should not show delete on the root', () => {
        app.condition = new AndGroup();
        (<AndGroup>app.condition).add(new OrGroup());
        fixture.detectChanges();

        const deleteButton = dom.querySelectorAll(`${AND} .delete`);
        expect(deleteButton.length).toBe(1);
        expect(dom.querySelectorAll(`${OR} .delete`).length).toBe(1);
      });
    });

    describe('collapsing and expanding groups', () => {
      xit('should collapse an and group.', () => {

      });
      xit('should expand an and group.', () => {

      });
      xit('should collapse an or group.', () => {

      });
      xit('should expand an or group.', () => {

      });
    });
  });
});

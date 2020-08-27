import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from '../../../shared/interfaces';
import { MaterialService, MaterialInstance } from '../../../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;
  positions: Position[] = [];
  loading = false;
  modal: MaterialInstance;
  form: FormGroup;
  positionId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postionService: PositionService,
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    this.loading = true;
    this.postionService.fetch(this.categoryId).subscribe(positions => {
      this.loading = false;
      this.positions = positions;
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSelectPositioin(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    const completed = () => {
      this.form.enable();
      this.modal.close();
      this.form.reset({name: '', cost: 1});
    };


    if (this.positionId) {
      newPosition._id = this.positionId;
      this.postionService.update(newPosition).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id);
          this.positions[idx] = position;
          MaterialService.toast('Изменения сохранены');
        }, error => MaterialService.toast(error.error.message),
        completed
      );
    }
    else {
      this.postionService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Позиция успешно создана');
          this.positions.push(position);
        }, error => MaterialService.toast(error.error.message),
        completed
      );
    }
  }

  deletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Вы уверены, что хотите удалить позицию ${position.name}?`);

    if (decision) {
      this.postionService.delete(position)
        .subscribe(
          response => {
            const idx = this.positions.findIndex(p => p._id === position._id);
            this.positions.splice(idx, 1);
            MaterialService.toast(response.message);
          },
          error => MaterialService.toast(error.error.message),
        );
    }
  }
}

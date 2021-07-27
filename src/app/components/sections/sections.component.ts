import _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { SectionsService } from '../../services/sections.service';
import { Campo, Catalogo, Seccione } from '../../interfaces/sections.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ModalConfig } from '../modal/modal.config';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  /* Variables */
  currentSection: number = 1;

  /* Objects */
  sections?: Campo[];

  catalogs?: Catalogo[] = [];

  payload?: number[];

  public modalConfig: ModalConfig = {
    data: {},
    modalTitle: "Seccion - Catalogos",
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    geData: (data: any) => {
      return data;
    }
  }

  /* Forms */
  form: FormGroup;

  /* Input/Output */
  @ViewChild('modal') private modal?: ModalComponent

  constructor(
    private sectionService: SectionsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      checkSection: this.fb.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    /* Realiza la petición al servicio de sección y obtiene la data */
    this.sectionService.getSection(this.currentSection).subscribe(
      data => {
        this.sections = data.secciones[0].campos;    
      },
      error => {
        throw new Error(error);
      }
    );
  }

  get field() {return this.form.controls;}

  async onCheckBoxChange(event: any) {
    let idCampo = +event.target.value;

    const checkSection: FormArray = this.form.get('checkSection') as FormArray;

    console.log('CHECK ARRAY: ', event.target.value);

    if (event.target.checked) {

      let data = this.sections?.filter(section => _.isEqual(section.id_campo, idCampo))[0];

      console.log('¿DATA?: ', data);

      if (_.has(data, 'catalogo')) {
        await this.modal?.open(data);
      } else {
        console.log(data);
      }
    }
    
    // let idCampo = +event.target.value;

    // if (event.target.checked) {

    //   let data = this.sections?.filter(section => _.isEqual(section.id_campo, idCampo))[0];

    //   if (_.has(data, 'catalogo')) {
    //     console.log('MOSTRAR MODAL CON ARRAY DE VALORES');
    //   } else {
    //     this.payload?.push(idCampo);
    //   }
    // } else {
    //   console.log('FALSO: ', event.target.value);
    // }
  }

  submitForm() {
    console.log(this.form);
    console.log(this.field);
    
  }

}
function onCheckBoxChangeCatalog(event: any, any: any) {
  throw new Error('Function not implemented.');
}


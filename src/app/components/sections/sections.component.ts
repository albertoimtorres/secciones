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
  currentSection?: number;

  isError: Boolean = false;

  /* Objects */
  sections?: Campo[];

  catalogs?: Catalogo[] = [];

  payload?: number[] = [];

  listSections: number [] = [
    1, 2, 3, 4, 5
  ];

  //! Configuracación de modal
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
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkSection: this.formBuilder.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    /* Realiza la petición al servicio de sección y obtiene la data */
    this.currentSection = 1;

    console.log('ESCENARIO 2');

    this.selectSection(this.currentSection);
    // this.sectionService.getSection(this.currentSection).subscribe(
    //   data => {
    //     this.sections = data.secciones[0].campos;    
    //   },
    //   error => {
    //     throw new Error(error);
    //   }
    // );
  }

  get field() {return this.form.controls;}

  selectSection(event: any) {
    let sectionId = _.isNumber(event) ? event : +event;

    console.log(sectionId);
    

    if (_.isEqual(sectionId, 0)) {
      this.sections = [];
    } else {
      this.sectionService.getSection(sectionId).subscribe(
        data => {
          this.sections = data.secciones[0].campos;
        },
        error => {
          throw new Error(error);
        }
      );
    }
  }

  async onCheckBoxChange(event: any) {

    // const checkSection: FormArray = this.form.get('checkSection') as FormArray;
    // console.log('CHECK SECTION: ', checkSection);
    
    console.log('EVENT TARGET VALUE: ', event.target.value);
    
    let idCampo = +event.target.value;

    if (idCampo) {

      let data = this.sections?.filter(section => _.isEqual(section.id_campo, idCampo))[0];

      if (_.has(data, 'catalogo')) {

        await this.modal?.open(data);

      } else {
        //! Arreglo de ids
        this.payload?.push(idCampo);
      }
    } else {
      console.log('FALSO: ', event.target.value);
    }
  }

  submitForm() {
    if (_.size(this.payload) > 0) {
      this.isError = false;
      console.log('SEND PAYLOAD: ', this.payload);
    } else {
      this.isError = true;
    }
  }

}

